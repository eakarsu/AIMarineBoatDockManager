const { Client } = require('pg');
const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const DB_NAME = 'marina_db';

// Connection string without database name (connects to default 'postgres' db)
const baseConnectionString = process.env.DATABASE_URL.replace(/\/marina_db/, '/postgres');

async function seed() {
  console.log('Starting database seed process...');

  // Step 1: Connect to default postgres database and recreate marina_db
  const adminClient = new Client({ connectionString: baseConnectionString });
  try {
    await adminClient.connect();
    console.log('Connected to PostgreSQL server.');

    // Terminate existing connections to marina_db
    await adminClient.query(`
      SELECT pg_terminate_backend(pg_stat_activity.pid)
      FROM pg_stat_activity
      WHERE pg_stat_activity.datname = '${DB_NAME}'
      AND pid <> pg_backend_pid();
    `);

    // Drop and recreate database
    await adminClient.query(`DROP DATABASE IF EXISTS ${DB_NAME};`);
    console.log(`Dropped database ${DB_NAME} (if existed).`);

    await adminClient.query(`CREATE DATABASE ${DB_NAME};`);
    console.log(`Created database ${DB_NAME}.`);
  } catch (err) {
    console.error('Error setting up database:', err.message);
    process.exit(1);
  } finally {
    await adminClient.end();
  }

  // Step 2: Connect to marina_db and run schema + seed
  const marinaClient = new Client({ connectionString: process.env.DATABASE_URL });
  try {
    await marinaClient.connect();
    console.log(`Connected to ${DB_NAME}.`);

    // Run schema.sql
    const schemaSql = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf8');
    await marinaClient.query(schemaSql);
    console.log('Schema created successfully.');

    // Insert user with hashed password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('password123', salt);

    await marinaClient.query(`
      INSERT INTO users (email, password, name, role) VALUES
      ($1, $2, $3, $4)
    `, ['admin@marina.com', hashedPassword, 'Marina Admin', 'admin']);
    console.log('Admin user created (admin@marina.com / password123).');

    // Run seed.sql
    const seedSql = fs.readFileSync(path.join(__dirname, 'seed.sql'), 'utf8');
    await marinaClient.query(seedSql);
    console.log('Seed data inserted successfully.');

    console.log('\nDatabase seeding complete!');
    console.log('----------------------------');
    console.log('Login credentials:');
    console.log('  Email: admin@marina.com');
    console.log('  Password: password123');
    console.log('----------------------------');

  } catch (err) {
    console.error('Error seeding database:', err.message);
    process.exit(1);
  } finally {
    await marinaClient.end();
  }
}

seed();
