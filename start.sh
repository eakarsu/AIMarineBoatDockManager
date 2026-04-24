#!/bin/bash

# ============================================
# AI Marina & Boat Dock Manager - Start Script
# ============================================
# This script:
# 1. Kills any processes on ports 3000 and 3001
# 2. Seeds the PostgreSQL database
# 3. Starts the backend (with hot reload via nodemon)
# 4. Starts the frontend (with hot reload via react-scripts)
# ============================================

set -e

PROJECT_DIR="$(cd "$(dirname "$0")" && pwd)"
cd "$PROJECT_DIR"

echo "============================================"
echo "  AI Marina & Boat Dock Manager"
echo "  Starting Application..."
echo "============================================"
echo ""

# --- Step 1: Clean up used ports ---
echo "[1/5] Cleaning up ports 3000 and 3001..."

cleanup_port() {
  local port=$1
  local pids=$(lsof -ti :$port 2>/dev/null || true)
  if [ -n "$pids" ]; then
    echo "  Killing processes on port $port: $pids"
    echo "$pids" | xargs kill -9 2>/dev/null || true
    sleep 1
  else
    echo "  Port $port is free"
  fi
}

cleanup_port 3000
cleanup_port 3001

echo ""

# --- Step 2: Install dependencies if needed ---
echo "[2/5] Checking dependencies..."

if [ ! -d "$PROJECT_DIR/server/node_modules" ]; then
  echo "  Installing server dependencies..."
  cd "$PROJECT_DIR/server" && npm install
  cd "$PROJECT_DIR"
else
  echo "  Server dependencies OK"
fi

if [ ! -d "$PROJECT_DIR/client/node_modules" ]; then
  echo "  Installing client dependencies..."
  cd "$PROJECT_DIR/client" && npm install
  cd "$PROJECT_DIR"
else
  echo "  Client dependencies OK"
fi

echo ""

# --- Step 3: Check PostgreSQL ---
echo "[3/5] Checking PostgreSQL..."

if ! command -v psql &> /dev/null; then
  echo "  ERROR: PostgreSQL is not installed. Please install it first."
  exit 1
fi

# Check if PostgreSQL is running
if ! pg_isready -q 2>/dev/null; then
  echo "  Starting PostgreSQL..."
  brew services start postgresql@14 2>/dev/null || brew services start postgresql 2>/dev/null || {
    echo "  ERROR: Could not start PostgreSQL. Please start it manually."
    exit 1
  }
  sleep 2
fi

echo "  PostgreSQL is running"
echo ""

# --- Step 4: Seed the database ---
echo "[4/5] Seeding database with sample data..."
cd "$PROJECT_DIR/server"
node seed.js
cd "$PROJECT_DIR"

echo ""

# --- Step 5: Start backend and frontend ---
echo "[5/5] Starting servers..."
echo ""
echo "  Backend:  http://localhost:3001 (with hot reload)"
echo "  Frontend: http://localhost:3000 (with hot reload)"
echo ""
echo "  Login: admin@marina.com / password123"
echo "  (Use 'Quick Demo Login' button to auto-fill)"
echo ""
echo "============================================"
echo "  Press Ctrl+C to stop all servers"
echo "============================================"
echo ""

# Start backend with nodemon (watches for changes)
cd "$PROJECT_DIR/server"
npx nodemon index.js &
BACKEND_PID=$!

# Start frontend with react-scripts (watches for changes)
cd "$PROJECT_DIR/client"
BROWSER=none PORT=3000 npm start &
FRONTEND_PID=$!

# Trap SIGINT/SIGTERM to clean up both processes
cleanup() {
  echo ""
  echo "Shutting down..."
  kill $BACKEND_PID 2>/dev/null || true
  kill $FRONTEND_PID 2>/dev/null || true
  cleanup_port 3000
  cleanup_port 3001
  echo "Done. Goodbye!"
  exit 0
}

trap cleanup SIGINT SIGTERM

# Wait for both processes
wait
