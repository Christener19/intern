import pool from "../../dbIndex";

// Table List

// 1. Engagement Logger
// recordid, zoomid, name, Poll completion rate, Screen share time, Screen share switch freq, Average engagement grade, Week number

// 2. Attendance
// recordid, zoomid, name, Todays attendance hours, Total attendance hours, Total days attended, Missing streak

// 3. Zoom Polls
// recordid, Zoom poll id, Zoom poll date, Zoom poll time, Poor, Average, Good, Response rate, Respondants, Non-respondants

// 4. name Picker
// recordid, zoomid, name

// 5. (Bootcampers)
// recordid, zoomid, name, (profile picture)


async function resetDatabase() {
    try {
        console.log("delete tables if they exist")
        // Drop existing tables if they exist
        await pool.query(`
            DROP TABLE IF EXISTS test_engagement_logger CASCADE;
            DROP TABLE IF EXISTS test_attendance CASCADE;
            DROP TABLE IF EXISTS test_zoom_polls CASCADE;
            DROP TABLE IF EXISTS test_name_picker CASCADE;
            DROP TABLE IF EXISTS test_bootcampers CASCADE
        `);
        console.log("creating engagement_logger table")
        // Create the engagement_logger table
        await pool.query(`
            CREATE TABLE test_engagement_logger (
              recordid INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
              zoomid INT,
              name VARCHAR(255) NOT NULL,
              poll_completion_rate REAL,
              screen_share_time REAL,
              screen_share_switch_freq INT,
              average_engagement_grade VARCHAR(255),
              week_number INT   
            );
        `);

        console.log("creating attendance table")
        // Create the Attendance table
        await pool.query(`
        CREATE TABLE test_attendance (
            recordid INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
            zoomid INT,
            name VARCHAR(255) NOT NULL,
            todays_attendance_hours REAL,
            total_attendance_hours REAL,
            total_days_attended INT,
            missing_streak REAL
            );
        `);

        console.log("creating zoom polls table")
        // Create the zoom polls table
        await pool.query(`
        CREATE TABLE test_zoom_polls (
            recordid INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
            zoom_poll_id INT,
            zoom_poll_date DATE,
            zoom_poll_time REAL,
            poor INT,
            average INT,
            good INT,
            response_rate REAL,
            respondants INT[],
            non_respondants INT[]
            );
        `);

        console.log("creating name_picker table")
        // Create the name picker table
        await pool.query(`
            CREATE TABLE test_name_picker (
              recordid INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
              zoomid INT,
              name VARCHAR(255) NOT NULL
            );
        `)

        console.log("creating bootcampers table")
        // Create the name bootcampers
        await pool.query(`
            CREATE TABLE test_bootcampers (
              recordid INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
              zoomid INT,
              name VARCHAR(255) NOT NULL
              );
        `)  


        console.log("all tables created db reset complete")
    } catch (error) {
        console.error("Database reset failed: ", error);
    } finally {
      // End the pool
      await pool.end();
    }
    
}


(async () => { await resetDatabase(); })()