// import block
import pool from "../dbIndex";

// file to manage all of the API calls to the database for the zoom_polls table
// GET the latest Poll results from postgres
export async function getLatestPollResult(tableName: string) {
  const queryText = `
        SELECT
            zoom_poll_id,
            poor,
            average,
            good,
            response_rate,
            respondants,
            non_respondants,
            zoom_poll_date, 
            zoom_poll_time 
        FROM ${tableName}
        ORDER BY zoom_poll_date DESC, zoom_poll_time DESC
        LIMIT 1;
    `;

  // set up client variable
  let client: any;
  // console.log("at model getLatestPollResult client start"); // debug logger

  try {
    client = await pool.connect(); // get new client from the pool
    const result = await pool.query(queryText);
    return result.rows[0] || null;
  } catch (error) {
    console.error("Error getting the latest poll results", error);
    throw error;
  } finally {
    if (client) {
      // release client connection
      client.release();
      // console.log("at model getLatestPollResult client end");  // debug logger
    }
  }
}

// GET Poll results from postgres
export async function getPollResults(zoomPollID: number, tableName: string) {
  const queryText = `
        SELECT
            poor,
            average,
            good
        FROM ${tableName}
            WHERE zoom_poll_id = $1;
     `;
  // set up client variable
  let client: any;
  // console.log("at model getPollResults client start"); // debug logger

  try {
    client = await pool.connect(); // get new client from the pool
    const result = await pool.query(queryText, [zoomPollID]);
    return result.rows;
  } catch (error) {
    console.error("Error getting poll results", error);
    throw error;
  } finally {
    if (client) {
      // release client connection
      client.release();
      // console.log("at model getPollResults client end"); // debug logger
    }
  }
}

// interface to set the types for the results
export interface ResultsType {
  zoom_poll_date: string;
  zoom_poll_time: number;
  poor: number;
  average: number;
  good: number;
  response_rate: number;
  respondants: number;
  non_respondants: number;
}

// POST poll results
export async function postNewPollResults(
  zoomPollID: number,
  results: ResultsType,
  tableName: string
) {
  // destructure object to post
  const {
    zoom_poll_date,
    zoom_poll_time,
    poor,
    average,
    good,
    response_rate,
    respondants,
    non_respondants,
  }: ResultsType = results;

  const queryText = `
        INSERT INTO ${tableName} (
            zoom_poll_id, zoom_poll_date, zoom_poll_time, poor, average, good, response_rate, respondants, non_respondants
            )
            VALUES (
                $1, $2, $3, $4, $5, $6, $7, $8
            )

            RETURNING *;
    `;
  // set up client variable
  let client: any;

  try {
    client = await pool.connect(); // get new client from the pool
    // console.log("at model postNewPollResults client start"); // debug logger
    const result = await pool.query(queryText, [
      zoomPollID,
      zoom_poll_date,
      zoom_poll_time,
      poor,
      average,
      good,
      response_rate,
      respondants,
      non_respondants,
    ]);
    // if no bootcamper exists with the specified ID the rows array will be empty
    return result.rows[0] || null;
  } catch (error) {
    console.error("Error updating record", error);
    throw error;
  } finally {
    if (client) {
      // release client connection
      client.release();
      // console.log("at model postNewPollResults client end"); // debug logger
    }
  }
}
// Patch poll results
export async function patchPollResults(
  ZoomPollID: number,
  patchResults: ResultsType,
  tableName: string
) {
  // destructure object to post
  const {
    zoom_poll_date,
    zoom_poll_time,
    poor,
    average,
    good,
    response_rate,
    respondants,
    non_respondants,
  }: ResultsType = patchResults;

  const queryText = `
        UPDATE ${tableName}
        SET
            zoom_poll_id = $1,
            zoom_poll_date = $2,
            zoom_poll_time = $3,
            poor = $4,
            average = $5,
            good = $6, -- Fix: There was a duplicate $5 here
            response_rate = $7,
            respondants = $8,
            non_respondants = $9
        WHERE
            zoom_poll_id = $10
    `;
  // set up client variable
  let client: any;

  try {
    client = await pool.connect(); // get new client from the pool
    // console.log("at model patchPollResults client start"); // debug logger
    const result = await pool.query(queryText, [
      ZoomPollID,
      zoom_poll_date,
      zoom_poll_time,
      poor,
      average,
      good,
      response_rate,
      respondants,
      non_respondants,
      ZoomPollID,
    ]);
    // if no bootcamper exists with the specified ID the rows array will be empty
    return result.rows[0] || null;
  } catch (error) {
    console.error("Error updating record", error);
    throw error;
  } finally {
    if (client) {
      // release client connection
      client.release();
      // console.log("at model patchPollResults client end"); // debug logger
    }
  }
}
