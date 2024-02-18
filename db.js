const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'gestion_medecin',
  password: 'root',
  port: 5432, // Port par défaut de PostgreSQL
});

module.exports = pool;
