import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

// Define the expected structure of each row returned by the query
interface MedicationRow  {
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
    const medicationName = url.searchParams.get("medicationName");

    if (!medicationName) {
      return NextResponse.json({ error: 'Medication name is required' }, { status: 400 });
    }

    // Fetch data from the "MedicCosts" table where description contains the medicationName (case-insensitive)
    const result = await sql<MedicationRow[]>`
      SELECT * FROM MedicCosts WHERE description ILIKE ${'%' + medicationName + '%'} LIMIT 1;;
    `;

    return NextResponse.json({ medications: result.rows });
  } catch (error) {
    console.error('Error fetching MedicCosts:', error);
    return NextResponse.json({ error: 'Failed to fetch MedicCosts' }, { status: 500 });
  }
}
