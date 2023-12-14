// lib/database/databasefetch.ts
import pool from './pg';

export async function fetchData(): Promise<any[]> {
  try {
    const result = await pool.query('SELECT * FROM "public"."test_bootcampers"'); 
    return result.rows;
  } catch (error) {
    throw error;
  }
}
