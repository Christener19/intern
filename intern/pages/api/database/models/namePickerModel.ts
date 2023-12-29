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
  // set up client variable
  let client: any;
  // console.log('at model getParticpantsList client start') // debug logger


  try {
    client = await pool.connect(); // get new client from the pool
        const nameList = await pool.query(queryText)
        return nameList.rows;
    } catch (error) {
        console.error('Error getting name list results', error);
        throw error;
    } finally {
        if (client) {
          // release client connection
          client.release();
          // console.log('at model getParticpantsList client start') // debug logger

        }
      }
    }

// Delete participant by zoom ID
export async function deleteName(zoomID: number, tableName : string) {
  console.log(`zoomid: ${zoomID}, table:${tableName}`)
    const queryText = `
        DELETE FROM ${tableName}
        WHERE zoomid = $1
        RETURNING *;
     `  
  // set up client variable
  let client: any;
  // console.log('at model deleteName client start') // debug logger


  client = await pool.connect(); // get new client from the pool
  try {
        const nameList = await client.query(queryText, [zoomID])
        return nameList.rows;
    } catch (error) {
        console.error('Error getting name list results', error);
        throw error;
    } finally {
        if (client) {
          // release client connection
          client.release();
          // console.log('at model deleteName client end') // debug logger

        }
      }
    }

// reset name picker table
    // going to need a list of all the people 