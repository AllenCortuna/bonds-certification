import mysql from 'mysql2/promise';

// Create the connection to database
const connection = await mysql.createConnection({
  host: 'localhost',
  user: 'admin',
  database: 'dpwh',
  password: 'Admin123'
});

export default connection;