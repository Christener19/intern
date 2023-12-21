// import block
import pool from "../dbIndex";

// file to manage all of the API calls to the database for the attendance table

// GET all bootcampers attendance
export async function getBootcampers(tableName: string) {
  const queryText = `
        SELECT
            COUNT(*) AS missing_streak_count
        FROM ${tableName}
        WHERE
            missing_streak = 0;
     `;
  // set up client variable
  let client: any;

  try {
    client = await pool.connect(); // get new client from the pool

    console.log('at model getBootcampers client start')
        const result = await pool.query(queryText)
        return result.rows;
    } catch (error) {
        console.error('Error patching record', error);
        throw error;
    } finally {
        if (client) {
          // release client connection
          client.release();
          console.log('at model getBootcampers client end')
        }
      }

    }
  }
}

// GET count of absent bootcampers attendance
export async function getAbsentBootcampersCount(tableName: string) {
  const queryText = `
        SELECT
            COUNT(*) AS missing_streak_count
        FROM ${tableName}
        WHERE
            missing_streak > 0;
     `;
  // set up client variable
  let client: any;

  try {
    console.log('at model getAbsentBootcampersCount client start')
    client = await pool.connect(); // get new client from the pool
        const result = await pool.query(queryText)
        return result.rows;
    } catch (error) {
        console.error('Error patching record', error);
        throw error;
    } finally {
        if (client) {
          // release client connection
          client.release();
          console.log('at model getAbsentBootcampersCount client end')
        }
      }
    }
  }
}

// GET missing people
// GET all bootcampers attendance
export async function getAbsentBootcampersID(tableName: string) {
  const queryText = `
        SELECT
         name, missing_streak
        FROM ${tableName}
        WHERE
            missing_streak > 0;
     `;
  // set up client variable
  let client: any;

  try {
    client = await pool.connect(); // get new client from the pool
    console.log('at model getAbsentBootcampersID client start')
        const result = await pool.query(queryText)
        return result.rows;
    } catch (error) {
        console.error('Error patching record', error);
        throw error;
    } finally {
        if (client) {
          // release client connection
          client.release();
          console.log('at model getAbsentBootcampersID client end')
        }
      }
    }
  }
}

// POST attendance data for a bootcamper
export async function registerBootcamperAttendance(
  zoomId: string,
  updates: any,
  tableName: string
) {
  const queryText = `
        UPDATE ${tableName}
            SET
            todays_attendance_hours = COALESCE ($1, todays_attendance_hours),
            total_attendance_hours = COALESCE ($2, total_attendance_hours),
            total_days_attended = COALESCE ($3, total_days_attended),
            missing_streak = COALESCE ($4, missing_streak)
            WHERE zoomId = $5
            RETURNING *;
    `;
  // set up client variable
  let client: any;

  try {
    client = await pool.connect(); // get new client from the pool
    console.log('at model registerBootcamperAttendance client start')
    const result = await pool.query(queryText, [
      updates.todays_attendance_hours,
      updates.total_attendance_hours,
      updates.total_days_attended,
      updates.missing_streak,
      zoomId,
    ]);
        // if no bootcamper exists with the specified ID the rows array will be empty
        return result.rows[0] || null;

    }  catch (error) {
        console.error('Error updating record', error);
        throw error;
    } finally {
        if (client) {
          // release client connection
          client.release();
          console.log('at model registerBootcamperAttendance client end')
        }
      }
    }
  }
}

// GET list of bootcampers attendance
export async function getListBootcampers(tableName: string) {
  const queryText = `
        SELECT
            * 
        FROM ${tableName}
     `;
  try {
    const result = await pool.query(queryText);
    return result.rows;
  } catch (error) {
    console.error("Error patching record", error);
    throw error;
  }
}

// GET all bootcampers attendance
export async function getBootcamperById(tableName: string, zoomid: string) {
  const queryText = `
        SELECT
            *
        FROM ${tableName}
        WHERE
            zoomid = ${zoomid}
     `;
  console.log(queryText);
  try {
    const result = await pool.query(queryText);
    return result.rows;
  } catch (error) {
    console.error("Error patching record", error);
    throw error;
  }
}

// POST attendance data for a bootcamper
export async function postBootcamperAttendance(
  zoomId: string,
  tableName: string,
  name: string
) {
  console.log(`zoomid: ${zoomId}`);
  const queryText = `
  INSERT INTO ${tableName} (zoomid, name, todays_attendance_hours, total_attendance_hours, total_days_attended, missing_streak)
  VALUES (${zoomId}, '${name}', 0, 0, 0, 0 )
  RETURNING *;
`;
  try {
    const result = await pool.query(queryText);
    // if no bootcamper exists with the specified ID the rows array will be empty
    return result.rows[0] || null;
  } catch (error) {
    console.error("Error updating record", error);
    throw error;
  }
}

// GET CSV from Postgres

// 1. Create a file
// 2. Copy CSV data to file
