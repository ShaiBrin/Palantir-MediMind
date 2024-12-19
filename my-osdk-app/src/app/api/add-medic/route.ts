import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';


export async function GET(request: Request) {
  try {
    // Hardcoded values for testing purposes
    const description = "testing";
    const ndcID = 123456;
    const oldPrice = 100.00;
    const newPrice = 200.00;
    const classification = "testing";
    const percentChange = 100.00;
    const reason = "testing";
    const endDate = "2022-12-31";
    const effData = "2022-12-31";

    // Insert the hardcoded location data into the database
    await sql`
    INSERT INTO MedicCosts (description, ndcID, oldPrice, newPrice,classification, percentChange,reason ,endDate, effData ) 
      VALUES (${description}, ${ndcID}, ${oldPrice}, ${newPrice}, ${classification}, ${percentChange}, ${reason}, ${endDate}, ${effData});
    `;

    return NextResponse.json({
      success: true,
      message: `MedicCosts "${description}" added successfully.`,
    });
  } catch (error) {
    console.error('Error adding location:', error);
    return NextResponse.json({ error: 'Failed to add location' }, { status: 500 });
  }
}
