const { Pool } = require('pg');

// Configure PostgreSQL connection
const pool = new Pool({
  user: 'postgres',       
  host: 'localhost',           
  database: 'assignment',  
  password: '123456',   
  port: 5432,           
});

// Initialize the database
(async () => {
  const client = await pool.connect();
  try {
    // Create the "products" table if it doesn't exist
    await client.query(`
      CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        price NUMERIC NOT NULL,
        availability BOOLEAN NOT NULL
      )
    `);
    console.log('Connected to the PostgreSQL database and ensured "products" table exists.');
  } catch (err) {
    console.error('Error initializing the database:', err.message);
  } finally {
    client.release();
  }
})();

module.exports = pool;
