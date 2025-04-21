const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres', // Ensure this is the correct user
  host: 'localhost', // Correct host if it's running locally
  database: 'stopwatchdb', // Ensure this matches the correct database name in PostgreSQL 16
  password: 'admin', // Use the correct password
  port: 5434, // Correct port for PostgreSQL 16
});

(async () => {
  try {
    const res = await pool.query('SELECT NOW()');
    console.log('Database connected successfully:', res.rows[0]);
  } catch (err) {
    console.error('Error connecting to database:', err.message);
  } finally {
    pool.end();
  }
})();
