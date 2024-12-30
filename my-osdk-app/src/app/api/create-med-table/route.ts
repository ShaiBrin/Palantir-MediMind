import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';


// Define the table creation and data insertion function
export async function GET(request: Request) {
    try {
    const result = await sql`
        CREATE TABLE Medications (
        description VARCHAR(255) NOT NULL,
        ndcID FLOAT PRIMARY KEY,
        oldPrice DECIMAL(10, 2),
        newPrice DECIMAL(10, 2),
        classification VARCHAR(255),
        percentChange FLOAT,
        reason VARCHAR(255),
        endDate DATE,
        effData DATE
    );
    `;
    return NextResponse.json({ result }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}