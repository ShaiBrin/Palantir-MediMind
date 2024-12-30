import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';


// Define the table creation and data insertion function
async function createAndInsertData() {
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
        effData DATA
    );
    `;
    return NextResponse.json({ result }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

// Run the function to create and insert data (this will only execute once)
createAndInsertData();
