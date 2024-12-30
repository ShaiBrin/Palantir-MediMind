import { sql } from '@vercel/postgres';
import fs from 'fs';
import csvParser from 'csv-parser'; // or any other CSV parser

const csvFilePath = '/path/to/your/file.csv'; // Path to your CSV file

async function insertCSVData() {
  // Open the CSV file and parse it
  const results: {
      description: any; // Replace `col1` with actual CSV column names
      ndcID: number; oldPrice: number; newPrice: number; classification: any; percentChange: number; reason: any; endDate: any; // Ensure this is in a valid date format
      effData: any;
  }[] = [];
  fs.createReadStream(csvFilePath)
    .pipe(csvParser())
    .on('data', (row) => {
      // Assuming CSV columns: [col1, col2, col3, col4, col5, col6, col7, col8, col9, col10]
      // Map CSV data to Medications table columns:
      const mappedRow = {
        description: row.col1,   // Replace `col1` with actual CSV column names
        ndcID: parseFloat(row.col2),
        oldPrice: parseFloat(row.col3),
        newPrice: parseFloat(row.col4),
        classification: row.col5,
        percentChange: parseFloat(row.col6),
        reason: row.col7,
        endDate: row.col8, // Ensure this is in a valid date format
        effData: row.col9, // Ensure this is in a valid date format
      };
      results.push(mappedRow);
    })
    .on('end', async () => {
      try {
        // Insert the parsed data into the Medications table
        for (const row of results) {
          await sql`
            INSERT INTO Medications (
              description, 
              ndcID, 
              oldPrice, 
              newPrice, 
              classification, 
              percentChange, 
              reason, 
              endDate, 
              effData
            )
            VALUES (
              ${row.description}, 
              ${row.ndcID}, 
              ${row.oldPrice}, 
              ${row.newPrice}, 
              ${row.classification}, 
              ${row.percentChange}, 
              ${row.reason}, 
              ${row.endDate}, 
              ${row.effData}
            );
          `;
        }
        console.log('Data inserted successfully');
      } catch (error) {
        console.error('Error inserting data:', error);
      }
    });
}

insertCSVData();
