// File: pages/api/update-total-cost.ts

import { sql } from '@vercel/postgres';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { ncdid, updatedPrice } = req.body;

    try {
      const result = await sql`
        UPDATE MedicCosts
        SET totalCost = ${updatedPrice}
        WHERE ndcID = ${ncdid};
      `;
      res.status(200).json({ result });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}