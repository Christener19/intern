// import block
import pool from "../dbIndex";
import throttle from "@/utils/delayCall";

// file to manage all of the API calls to the database for the enagement_logger table

// GET Poll completion rate from postgres
export async function getPollCompletionRate(zoomID: number, tableName: string) {
  // applying delay to avoid rate limit
  await throttle();

  const queryText = `
        SELECT
            poll_completion_rate
        FROM ${tableName}
            WHERE zoomID = $1
        RETURNING poll_completion_rate;
     `;

  // set up client variable
  let client: any;

  try {
    client = await pool.connect(); // get new client from the pool

    const result = await client.query(queryText, [zoomID]);
    return result.rows;
  } catch (error) {
    console.error("Error getting poll_completion_rate", error);
    throw error;
  } finally {
    if (client) {
      // release client connection
      client.release();
    }
  }
}

// GET screenshare time from postgres
export async function getScreenShareTime(zoomID: number, tableName: string) {
  // applying delay to avoid rate limit
  await throttle();

  const queryText = `
    SELECT
        screen_share_time
    FROM ${tableName}
        WHERE zoomID = $1
    RETURNING screen_share_time;
     `;
  // set up client variable
  let client: any;

  try {
    client = await pool.connect(); // get new client from the pool

    const result = await client.query(queryText, [zoomID]);
    return result.rows;
  } catch (error) {
    console.error("Error getting screen_share_time", error);
    throw error;
  } finally {
    if (client) {
      // release client connection
      client.release();
    }
  }
}

// GET screenshare freq from postgres
export async function getScreenShareFreq(zoomID: number, tableName: string) {
  // applying delay to avoid rate limit
  await throttle();

  const queryText = `
    SELECT
        screen_share_switch_freq
    FROM ${tableName}
        WHERE zoomID = $1
    RETURNING screen_share_switch_freq;
     `;
  // set up client variable
  let client: any;

  try {
    client = await pool.connect(); // get new client from the pool

    const result = await client.query(queryText, [zoomID]);
    return result.rows;
  } catch (error) {
    console.error("Error getting screen_share_switch_freq", error);
    throw error;
  } finally {
    if (client) {
      // release client connection
      client.release();
    }
  }
}

// GET engagement card props from postgres - to be called on a loop to get everyone
export async function getEngagementCardData(zoomID: number, tableName: string) {
  // applying delay to avoid rate limit
  await throttle();

  const queryText = `
        SELECT
            name,
            average_engagement_grade,
        FROM ${tableName}
            WHERE zoomID = $1
        RETURNING *;
     `;
  // set up client variable
  let client: any;

  try {
    client = await pool.connect(); // get new client from the pool

    const result = await client.query(queryText, [zoomID]);
    return result.rows;
  } catch (error) {
    console.error("Error getting data for engagement card", error);
    throw error;
  } finally {
    if (client) {
      // release client connection
      client.release();
    }
  }
}

// PATCH avegage engagement data for a bootcamper
export async function patchEngagmentGrade(
  zoomId: number,
  week_number: number,
  average_engagement_grade: string,
  tableName: string
) {
  // applying delay to avoid rate limit
  await throttle();
  console.log("delay applied");

  console.log(
    `Model: patching record ID: ${zoomId}, Week Number: ${week_number}, Grade: ${average_engagement_grade}`
  );
  const queryText = `
        UPDATE ${tableName}
            SET
            average_engagement_grade = COALESCE($1, average_engagement_grade)
            WHERE zoomId = $2 AND week_number = $3
            RETURNING *;
    `;
  // set up client variable
  let client: any;

  try {
    client = await pool.connect(); // get new client from the pool

    const result = await client.query(queryText, [
      average_engagement_grade,
      zoomId,
      week_number,
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
    }
  }
}

// PATCH poll completion rate for a bootcamper
export async function patchPollCompletion(
  zoomId: number,
  week_number: number,
  poll_completion_rate: number,
  tableName: string
) {
  // applying delay to avoid rate limit
  await throttle();

  const queryText = `
        UPDATE ${tableName}
            SET
            poll_completion_rate = COALESCE($1, poll_completion_rate)
            WHERE zoomId = $2 AND week_number = $3
            RETURNING *;
    `;
  // set up client variable
  let client: any;

  try {
    client = await pool.connect(); // get new client from the pool

    const result = await client.query(queryText, [
      poll_completion_rate,
      week_number,
      zoomId,
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
    }
  }
}

// PATCH screen Share Time for a bootcamper
export async function patchScreenShareTime(
  zoomId: number,
  week_number: number,
  screen_share_time: number,
  tableName: string
) {
  // applying delay to avoid rate limit
  await throttle();

  const queryText = `
        UPDATE ${tableName}
            SET
            screen_share_time = COALESCE($1, screen_share_time)
            WHERE zoomId = $2 AND week_number = $3
            RETURNING *;
    `;
  // set up client variable
  let client: any;

  try {
    client = await pool.connect(); // get new client from the pool

    const result = await client.query(queryText, [
      screen_share_time,
      week_number,
      zoomId,
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
    }
  }
}

// PATCH screen share switch frew for a bootcamper
export async function patchScreenShareSwitchFreq(
  zoomId: number,
  week_number: number,
  screen_share_switch_freq: number,
  tableName: string
) {
  // applying delay to avoid rate limit
  await throttle();

  const queryText = `
        UPDATE ${tableName}
            SET
            screen_share_switch_freq = COALESCE($1, screen_share_switch_freq)
            WHERE zoomId = $2 AND week_number = $3
            RETURNING *;
    `;
  // set up client variable
  let client: any;

  try {
    client = await pool.connect(); // get new client from the pool

    const result = await client.query(queryText, [
      screen_share_switch_freq,
      week_number,
      zoomId,
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
    }
  }
}
// GET for all screen share switch to use in engagment calc
export async function getAllScreenSwitch(
  tableName: string,
  weekNumber: number
) {
  // applying delay to avoid rate limit
  await throttle();

  console.log("getting all screen switch model");
  const tabName = tableName;
  const weeknum = weekNumber;

  // query to run
  const queryText = `
    SELECT
    screen_share_switch_freq
    FROM ${tabName}
    WHERE week_number = $1
    `;
  // try this first
  // set up client variable
  let client: any;

  try {
    client = await pool.connect(); // get new client from the pool

    const result = await client.query(queryText, [weeknum]);
    return result.rows;
    // if fail throw the error
  } catch (error) {
    console.error(`Error in getAllScreenSwitch:`, error);
    throw error;
  } finally {
    if (client) {
      // release client connection
      client.release();
    }
  }
}

// GET for all screen time to use in engagment calc
export async function getAllScreenTime(tableName: string, weekNumber: number) {
  console.log("getting all screen time model");
  const tabName = tableName;
  const weeknum = weekNumber;

  // applying delay to avoid rate limit
  await throttle();

  // query to run
  const queryText = `
       SELECT
       screen_share_time
       FROM ${tabName}
       WHERE week_number = $1
       `;
  // try this first
  // set up client variable
  let client: any;

  try {
    client = await pool.connect(); // get new client from the pool

    const result = await client.query(queryText, [weeknum]);
    return result.rows;
    // if fail throw the error
  } catch (error) {
    console.error(`Error in getAllScreenTime:`, error);
    throw error;
  } finally {
    if (client) {
      // release client connection
      client.release();
    }
  }
}

// GET all bootcamper data
export async function getBootcampersDataArr(
  tableName: string,
  weekNumber: number
) {
  // applying delay to avoid rate limit
  await throttle();

  console.log("Getting all bootcampers in an array of objects");

  const tabName = tableName;
  const weeknum = weekNumber;

  // query to run
  const queryText = `
    SELECT
    zoomid, poll_completion_rate, screen_share_time, screen_share_switch_freq
    FROM ${tabName}
    WHERE week_number = $1;
    `;
  // try
  // set up client variable
  let client: any;

  try {
    client = await pool.connect(); // get new client from the pool

    const result = await client.query(queryText, [weeknum]);
    return result.rows;
    // if fail throw an error
  } catch (error) {
    console.error(`Error in getBootcampersDataArr:`, error);
    throw error;
  } finally {
    if (client) {
      // release client connection
      client.release();
    }
  }
}

// GET people and engagement score by week number
export async function getEngagementCardPropsByWeek(
  weekNumber: number,
  tableName: string
) {
  // applying delay to avoid rate limit
  await throttle();

  // console.log(`tableName, ${tableName}`);
  const queryText = `
        SELECT
            name, 
            average_engagement_grade
        FROM ${tableName}
            WHERE week_number = $1
     `;
  // set up client variable
  let client: any;

  try {
    client = await pool.connect(); // get new client from the pool

    const result = await client.query(queryText, [weekNumber]);
    return result.rows;
  } catch (error) {
    console.error("Error getting poll_completion_rate", error);
    throw error;
  } finally {
    if (client) {
      // release client connection
      client.release();
    }
  }
}
