import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

// Define the table alteration function to add a new column
export async function GET(request: Request) {
  try {
    const result = await sql`
      ALTER TABLE MedicCosts
      ADD COLUMN totalcost DECIMAL(10, 2); -- Replace newColumnName with the actual column name and type
    `;
    return NextResponse.json({ result }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}