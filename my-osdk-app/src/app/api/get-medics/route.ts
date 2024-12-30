import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

// Define the expected structure of each row returned by the query
type MedicationRow = {
  description: string;
  ndcID: number;
  oldPrice: number;
  newPrice: number;
  classification: string;
  percentChange: number;
  reason: string;
  endDate: string;
  effData: string;
};

export async function GET() {
  try {
    // Fetch all data from the "Medications" table
    const result = await sql<MedicationRow[]>`
      SELECT description, ndcID, oldPrice, newPrice, classification, percentChange, reason, endDate, effData
      FROM MedicCosts;
    `;

    // Return the fetched data as a JSON response
    return NextResponse.json({ medications: result.rows });
  } catch (error) {
    console.error('Error fetching MedicCosts:', error);
    return NextResponse.json({ error: 'Failed to fetch MedicCosts' }, { status: 500 });
  }
}
