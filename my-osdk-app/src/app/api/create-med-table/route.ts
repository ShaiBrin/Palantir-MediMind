import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';


// Define the table creation and data insertion function
export async function GET(request: Request) {
    try {
    const result = await sql`
        CREATE TABLE MedicCosts (
        description VARCHAR(255) NOT NULL,
        ndcID VARCHAR(50) PRIMARY KEY, -- Store NDC as a string to match the CSV format
        oldPrice DECIMAL(10, 5),       -- Increase precision to handle more decimal places
        newPrice DECIMAL(10, 5),       -- Match the precision of oldPrice
        classification VARCHAR(255),
        percentChange DECIMAL(10, 2),  -- Store percentage changes as decimals
        reason VARCHAR(255),
        startDate DATE,
        endDate DATE,
        effData DATE
    );
    `;
    return NextResponse.json({ result }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}