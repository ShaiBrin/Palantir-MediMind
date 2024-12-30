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

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const ndcID = url.searchParams.get("ndcID");

    if (!ndcID) {
      return NextResponse.json({ error: 'NDC ID is required' }, { status: 400 });
    }

    // Fetch data from the "MedicCosts" table where ndcID matches the provided value
    const result = await sql<MedicationRow[]>`
      SELECT * FROM MedicCosts WHERE ndcID = ${ndcID};
    `;

    return NextResponse.json({ medications: result.rows });
  } catch (error) {
    console.error('Error fetching MedicCosts:', error);
    return NextResponse.json({ error: 'Failed to fetch MedicCosts' }, { status: 500 });
  }
}
