const { Client } = require('pg');
const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

function requireDisposableDatabase() {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is required');
  }
  const url = new URL(process.env.DATABASE_URL);
  const database = decodeURIComponent(url.pathname.replace(/^\//, ''));
  const allowedHosts = new Set(['127.0.0.1', 'localhost', '::1']);
  if (process.env.ALLOW_DISPOSABLE_SEED !== 'YES') {
    throw new Error('Refusing to reset data without ALLOW_DISPOSABLE_SEED=YES');
  }
  if (process.env.DISPOSABLE_DATABASE_CONFIRMATION !== database) {
    throw new Error('DISPOSABLE_DATABASE_CONFIRMATION must exactly match the target database');
  }
  if (!allowedHosts.has(url.hostname) && process.env.ALLOW_REMOTE_DISPOSABLE_SEED !== 'true') {
    throw new Error('Refusing to reset a non-local database');
  }
  return database;
}

async function seed() {
  const database = requireDisposableDatabase();
  console.log('Starting database seed process...');
  const marinaClient = new Client({ connectionString: process.env.DATABASE_URL });
  try {
    await marinaClient.connect();
    console.log(`Connected to acknowledged disposable database ${database}.`);

    await marinaClient.query('DROP SCHEMA public CASCADE; CREATE SCHEMA public;');

    // Run schema.sql
    const schemaSql = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf8');
    await marinaClient.query(schemaSql);
    console.log('Schema created successfully.');

    // Insert user with hashed password
    const adminEmail = process.env.SEED_ADMIN_EMAIL || process.env.ADMIN_EMAIL;
    const adminPassword = process.env.SEED_ADMIN_PASSWORD || process.env.ADMIN_PASSWORD;
    const adminName = process.env.BOOTSTRAP_ADMIN_NAME || 'Marina Admin';
    if (!adminEmail || !adminPassword) {
      throw new Error('SEED_ADMIN_EMAIL and SEED_ADMIN_PASSWORD are required');
    }
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(adminPassword, salt);

    await marinaClient.query(`
      INSERT INTO users (email, password, name, role) VALUES
      ($1, $2, $3, $4)
    `, [adminEmail, hashedPassword, adminName, 'admin']);
    console.log(`Admin user created for ${adminEmail}.`);

    // Run seed.sql
    const seedSql = fs.readFileSync(path.join(__dirname, 'seed.sql'), 'utf8');
    await marinaClient.query(seedSql);
    console.log('Seed data inserted successfully.');

    console.log('\nDatabase seeding complete.');

  } catch (err) {
    throw err;
  } finally {
    await marinaClient.end();
  }
}

seed().catch((err) => {
  console.error('Seed refused or failed:', err.message);
  process.exit(1);
});
