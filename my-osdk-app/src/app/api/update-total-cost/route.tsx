import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { ncdid, updatedPrice } = body;

    const result = await sql`
      UPDATE MedicCosts
      SET totalCost = ${updatedPrice}
      WHERE ndcID = ${ncdid};
    `;

    return NextResponse.json({ result });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
