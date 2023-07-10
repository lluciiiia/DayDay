import mysql from 'mysql2/promise';

// Create a MySQL connection pool
const connection = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'ny99hing!',
  database: 'diary_data',
});

export default connection;
