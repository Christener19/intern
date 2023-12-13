// Import block

import { NextApiRequest, NextApiResponse } from "next";
import pool from "../../../dbIndex";
import createCsvWriter from "csv-writer";
import { create } from "ts-node";

export default async function csvDownloader(req: NextApiRequest, res: NextApiResponse) {
    const { rows } = await pool.query(`SELECT * FROM test_attendance`);

    if (rows.length === 0) {
        return res.status(404).json({error: 'No data found' });
    }

    const csvWriter = createCsvWriter({
        path: 'ferrari.csv',
        header: Object.keys(rows[0]).map((key) => ({ id:key, title: key }))
    });

    csvWriter.writeRecords(rows).then(() => {
        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', 'attachment; filename=ferrari.csv');
        res.status(200).download('ferrari.csv')
    });
}