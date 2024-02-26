// pages/api/dbOperation.js

import { createConnection } from 'mysql2/promise';

export default async function handler(req, res) {
  // Establish database connection
  const connection = await createConnection({
    host: 'localhost',
    user: 'admin',
    password: 'Admin123',
    database: 'dpwh',
  });

  try {
    // Extract data from the request body
    const { contractNo, content } = req.body;
    console.log(contractNo);

    // Perform database operation (e.g., insert data)
    const [result] = await connection.execute('INSERT INTO your_table (contractNo, content) VALUES (?, ?)', [contractNo, content]);
    console.log('Data inserted successfully:', result);

    // Send a success response
    res.status(200).json({ success: true });
  } catch (error) {
    // Handle errors
    console.error('Error inserting data:', error);
    res.status(500).json({ error: 'Internal server error' });
  } finally {
    // Close the database connection
    await connection.end();
  }
}
