// import block
import pool from "../dbIndex";

// file to manage all of the API calls to the database for the zoom_polls table

// GET Poll results from postgres
export async function getPollResults(ZoomPollID: number, tableName : string) {

    const queryText = `
        SELECT
            poor,
            average,
            good
        FROM ${tableName}
            WHERE zoom_poll_id = $1;
     `  
    try {
        const result = await pool.query(queryText, [ZoomPollID])
        return result.rows;
    } catch (error) {
        console.error('Error getting poll results', error);
        throw error;
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
export async function postNewPollResults(ZoomPollID : number, results : ResultsType, tableName : string) {

    // destructure object to post
    const {zoom_poll_date, zoom_poll_time, poor, average, good, response_rate, respondants, non_respondants}: ResultsType = results

    const queryText = `
        INSERT INTO ${tableName} (
            zoom_poll_id, zoom_poll_date, zoom_poll_time, poor, average, good, response_rate, respondants, non_respondants
            )
            VALUES (
                $1, $2, $3, $4, $5, $6, $7, $8
            )

            RETURNING *;
    `
    try {
    const result = await pool.query(queryText, [
            ZoomPollID,
            zoom_poll_date,
            zoom_poll_time,
            poor,
            average,
            good,
            response_rate,
            respondants,
            non_respondants
    ]);
        // if no bootcamper exists with the specified ID the rows array will be empty
        return result.rows[0] || null;

    }  catch (error) {
        console.error('Error updating record', error);
        throw error;
    }
}

// Patch poll results
export async function patchPollResults(ZoomPollID : number, patchResults : ResultsType, tableName : string) {

    // destructure object to post
    const {zoom_poll_date, zoom_poll_time, poor, average, good, response_rate, respondants, non_respondants}: ResultsType = patchResults

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
    `
    try {
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
            ZoomPollID
    ]);
        // if no bootcamper exists with the specified ID the rows array will be empty
        return result.rows[0] || null;

    }  catch (error) {
        console.error('Error updating record', error);
        throw error;
    }
}