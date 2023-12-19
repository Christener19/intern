// import block
import pool from "../dbIndex";

// file to manage all of the API calls to the database for the name_picker table

// GET list of all bootcampers and their zoom IDs
export async function getParticpantsList(tableName : string) {

    const queryText = `
        SELECT
            name,
            zoomid
        FROM ${tableName};
            `  
    try {
        const nameList = await pool.query(queryText)
        return nameList.rows;
    } catch (error) {
        console.error('Error getting name list results', error);
        throw error;
    }    
}

// Delete participant by zoom ID
export async function deleteName(zoomID: number, tableName : string) {

    const queryText = `
        DELETE FROM ${tableName}
        WHERE zoomid = $1
        RETURNING *;
     `  
    try {
        const nameList = await pool.query(queryText [zoomID])
        return nameList.rows;
    } catch (error) {
        console.error('Error getting name list results', error);
        throw error;
    }    
}

// reset name picker table
    // going to need a list of all the people 