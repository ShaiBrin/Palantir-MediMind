import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';


export async function GET(request: Request) {
  try {
    // Hardcoded values for testing purposes
    const hardcodedLocation = "Cairgo";
    const lat = 34.0522;   // Latitude for Los Angeles
    const long = -118.2437; // Longitude for Los Angeles

    // Insert the hardcoded location data into the database
    await sql`
    INSERT INTO Locations (name, latitude, longitude) 
      VALUES (${hardcodedLocation}, ${lat}, ${long});
    `;

    return NextResponse.json({
      success: true,
      message: `Location "${hardcodedLocation}" added successfully.`,
    });
  } catch (error) {
    console.error('Error adding location:', error);
    return NextResponse.json({ error: 'Failed to add location' }, { status: 500 });
  }
}
