// Import block
import { NextApiRequest, NextApiResponse } from "next";
import pool from "../../dbIndex";
import { parse } from 'json2csv';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Check if it's a test
    const testQuery: boolean | null = Boolean(req.query.testCheck);

    // Determine the table name based on the testQuery value
    const tableName = testQuery ? 'test_engagement_logger' : 'engagement_logger';

    // Fetch data from the specified table
    const result = await pool.query(`SELECT * FROM ${tableName}`);
    const data = result.rows;

    // Convert the json data to CSV using json2csv
    const csvData = parse(data, { header: true });

    // Set the headers for the response and the file name
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=engagement_logger.csv');

    // Send the CSV data as the response
    res.status(200).send(csvData);
  } catch (error) {
    console.error('Error fetching data from the database:', error);
    res.status(500).end();
  }
}
