// pages/api/database/fetchdatabase.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { fetchData } from '../../../lib/database/databasefatch'; 

export default async function handler(
  req: NextApiRequest, 
  res: NextApiResponse
) {
  try {
    const data = await fetchData();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

