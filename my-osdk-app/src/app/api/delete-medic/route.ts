import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function DELETE(request: Request) {
  try {
    // Extract the description parameter from the URL
    const { ndcID } = await request.json();

    // Ensure description is provided
    if (!ndcID) {
      return NextResponse.json(
        { error: 'ndcID is required to delete a medication.' },
        { status: 400 }
      );
    }

    // Perform the DELETE operation based on the description
    const result = await sql`
      DELETE FROM Medications
      WHERE ndcID = ${ndcID}
      RETURNING *;
    `;

    // If no rows are affected, it means no medication with the given description exists
    if (result.rowCount === 0) {
      return NextResponse.json(
        { message: 'No medication found with the provided description.' },
        { status: 404 }
      );
    }

    // Return success message
    return NextResponse.json(
      { message: `Medication with ndcID "${ndcID}" deleted successfully.` },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting medication:', error);
    return NextResponse.json({ error: 'Failed to delete medication' }, { status: 500 });
  }
}
