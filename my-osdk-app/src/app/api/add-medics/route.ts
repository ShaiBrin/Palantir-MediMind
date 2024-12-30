import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import csvParser from 'csv-parser';

export async function GET(request: Request) {
  try {
    // Log the process start
    console.log('Starting to process the CSV file.');

    // Path to the CSV file
    const csvFilePath = path.join(process.cwd(), 'data', 'medicCosts.csv');
    console.log('CSV file path:', csvFilePath);

    const rows: any[] = [];
    let isFirstRow = true;

    // Log before starting the file read
    console.log('Reading and parsing the CSV file.');

    fs.createReadStream(csvFilePath)
      .pipe(csvParser())
      .on('data', (row) => {
        // Log each row read from the CSV
        console.log('Row read:', row);

        if (isFirstRow) {
          isFirstRow = false; // Skip the first row (header)
        } else {
          // Validate row data before adding it to the array
          if (
            row['NDC Description'] &&
            row['NDC'] &&
            row['Old NADAC Per Unit'] &&
            row['New NADAC Per Unit']
          ) {
            rows.push(row); // Add valid rows
          } else {
            console.warn('Invalid row skipped:', row); // Warn about invalid rows
          }
        }
      })
      .on('end', async () => {
        console.log('Finished reading the CSV file.');
        console.log('Total valid rows:', rows.length);

        try {
          // Insert each valid row into the database
          for (const row of rows) {
            console.log('Preparing to insert row:', row); // Log the row before inserting

            const {
              'NDC Description': description,
              NDC: ndcID,
              'Old NADAC Per Unit': oldPrice,
              'New NADAC Per Unit': newPrice,
              'Classification for Rate Setting': classification,
              'Percent Change': percentChange,
              'Primary Reason': reason,
              'Start Date': startDate,
              'End Date': endDate,
              'Effective Date': effData,
            } = row;

            if (!description || !ndcID || !oldPrice || !newPrice) {
              console.error('Skipping invalid row during insertion:', row);
              continue; // Skip invalid rows
            }

            await sql`
              INSERT INTO MedicCosts (
                description,
                ndcID,
                oldPrice,
                newPrice,
                classification,
                percentChange,
                reason,
                startDate,
                endDate,
                effData
              )
              VALUES (
                ${description},
                ${ndcID}, -- Already VARCHAR, no need to parse
                ${parseFloat(oldPrice)},
                ${parseFloat(newPrice)},
                ${classification || null},
                ${parseFloat(percentChange) || null},
                ${reason || null},
                ${startDate || null},
                ${endDate || null},
                ${effData || null}
              );
            `;

            console.log('Row inserted successfully:', row);
          }

          return NextResponse.json({ message: 'Data successfully imported!' }, { status: 200 });
        } catch (error) {
          console.error('Error inserting data:', error);
          return NextResponse.json({ error: 'Failed to insert data into MedicCosts' }, { status: 500 });
        }
      })
      .on('error', (error) => {
        console.error('Error reading the CSV file:', error);
        return NextResponse.json({ error: 'Error reading the CSV file' }, { status: 500 });
      });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
