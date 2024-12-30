// pages/api/addRecord.js
import { Pool } from 'pg';

// Create a connection pool
const pool = new Pool({
  user: 'your_username',
  host: 'localhost', // or your database host
  database: 'your_database',
  password: 'your_password',
  port: 5432, // Default PostgreSQL port
});

export default async function handler(req: { method: string; body: { name: any; email: any; age: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { message?: string; error?: string; }): void; new(): any; }; }; }) {
  if (req.method === 'POST') {
    const { name, email, age } = req.body; // Extract data from request body

    try {
      // Insert data into the database
      const query = 'INSERT INTO users (name, email, age) VALUES ($1, $2, $3)';
      const values = [name, email, age];
      await pool.query(query, values);

      res.status(200).json({ message: 'Record added successfully!' });
    } catch (error) {
      console.error('Database error:', error);
      res.status(500).json({ error: 'Failed to add record' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
