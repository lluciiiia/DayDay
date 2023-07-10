const mysql = require('mysql2');

// Create a MySQL connection pool
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'diary_data'
});

export default connection;
