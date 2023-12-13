// import block
import pool from "../../dbIndex";

// file to manage all of the API calls to the database for the enagement_logger table

// GET Poll completion from postgres
export async function getPollCompletionRate(zoomID : number, tableName : string) {

    const queryText = `
        SELECT
            poll_completion_rate
        FROM ${tableName}
            WHERE zoomID = $1
        RETURNING poll_completion_rate;
     `  
    try {
        const result = await pool.query(queryText)
        return result.rows;
    } catch (error) {
        console.error('Error getting poll_completion_rate', error);
        throw error;
    }    
}

// GET screenshare time from postgres
export async function getScreenShareTime(zoomID : number, tableName : string) {
    const queryText = `
    SELECT
        screen_share_time
    FROM ${tableName}
        WHERE zoomID = $1
    RETURNING screen_share_time;
     `  
    try {
        const result = await pool.query(queryText)
        return result.rows;
    } catch (error) {
        console.error('Error getting screen_share_time', error);
        throw error;
    }    
}

// GET screenshare freq from postgres
export async function getScreenShareFreq(zoomID : number, tableName : string) {
    const queryText = `
    SELECT
        screen_share_switch_freq
    FROM ${tableName}
        WHERE zoomID = $1
    RETURNING screen_share_switch_freq;
     `  
    try {
        const result = await pool.query(queryText)
        return result.rows;
    } catch (error) {
        console.error('Error getting screen_share_switch_freq', error);
        throw error;
    }    
}

// GET engagement card props from postgres
export async function getEngagementCardData(zoomID : number, tableName : string) {
    const queryText = `
        SELECT
            name,
            average_engagement_grade,
        FROM ${tableName}
            WHERE zoomID = $1
        RETURNING *;
     `  
    try {
        const result = await pool.query(queryText)
        return result.rows;
    } catch (error) {
        console.error('Error getting data for engagement card', error);
        throw error;
    }    
}

// PATCH avegage engagement data for a bootcamper
export async function patchEngagmentGrade(zoomId : number, week_number : number, average_engagement_grade : string, tableName : string) {
    const queryText = `
        UPDATE ${tableName}
            SET
            average_engagement_grade = COALESCE ($1, average_engagement_grade)
            WHERE zoomId = $2 AND week_number = $3
            RETURNING *;
    `
    try {
    const result = await pool.query(queryText, [
            average_engagement_grade,
            week_number,
            zoomId,
    ]);
        // if no bootcamper exists with the specified ID the rows array will be empty
        return result.rows[0] || null;

    }  catch (error) {
        console.error('Error updating record', error);
        throw error;
    }
}