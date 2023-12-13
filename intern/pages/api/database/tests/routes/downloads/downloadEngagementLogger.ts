// Import block
import { NextApiRequest, NextApiResponse } from "next";
import pool from "../../../dbIndex";
import { parse } from 'json2csv';

export default async function handler(req : NextApiRequest, res : NextApiResponse) {
    try {
      // Fetch data from the test_attendance table
      const result = await pool.query('SELECT * FROM test_engagement_logger');
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