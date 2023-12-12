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
            DROP TABLE IF EXISTS test_bootcampers CASCADE;
            
        `);
 
console.log("test all tables dropped")
    } catch (error) {
        console.error("Test Database deletion failed: ", error);
    } finally {
      // End the pool
      await pool.end();
    }
    
}


(async () => { await resetDatabase(); })()