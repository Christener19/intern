import pool from "../../../../pages/api/database/dbIndex";

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

// written as one long function as attempts to make this run as sequential asyncs was not working and taking too much time.

export default async function resetTestDatabase() {
  try {
    // drop tables
    // console.log("delete tables if they exist");
    // Drop existing tables if they exist
    await pool.query(`
            DROP TABLE IF EXISTS test_engagement_logger CASCADE;
            DROP TABLE IF EXISTS test_attendance CASCADE;
            DROP TABLE IF EXISTS test_zoom_polls CASCADE;
            DROP TABLE IF EXISTS test_name_picker CASCADE;
            DROP TABLE IF EXISTS test_bootcampers CASCADE
        `);
    // console.log("tables dropped succesfully");

    // create tables
    // console.log("creating engagement_logger table");
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

    // console.log("creating attendance table");
    // Create the Attendance table
    await pool.query(`
        CREATE TABLE test_attendance (
            recordid INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
            zoomid VARCHAR(255) NOT NULL,
            name VARCHAR(255) NOT NULL,
            todays_attendance_hours REAL,
            total_attendance_hours REAL,
            total_days_attended INT,
            missing_streak REAL
            );
        `);

    // console.log("creating zoom polls table");
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

    // console.log("creating name_picker table");
    // Create the name picker table
    await pool.query(`
            CREATE TABLE test_name_picker (
              recordid INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
              zoomid INT,
              name VARCHAR(255) NOT NULL
            );
        `);

    // console.log("creating bootcampers table");
    // Create the name bootcampers
    await pool.query(`
            CREATE TABLE test_bootcampers (
              recordid INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
              zoomid INT,
              name VARCHAR(255) NOT NULL
              );
        `);
    // console.log("all tables created db reset complete");
    // seed tables
    // console.log("engagement logger table seeded");
    await pool.query(`
            INSERT INTO test_engagement_logger (zoomid, name, poll_completion_rate, screen_share_time, screen_share_switch_freq, average_engagement_grade, week_number)
            VALUES
            (123, 'John Doe', 0.99, 300, 300, 'Ungraded', 1),
            (456, 'Jane Smith', 0.99, 15.2, 8, 'Ungraded', 1),
            (789, 'Bob Johnson', 0.62, 15.2, 3, 'Ungraded', 1),
            (987, 'Alice Williams', 0.92, 18.3, 6, 'Ungraded', 1),
            (654, 'Charlie Brown', 0.78, 25.7, 4, 'Ungraded', 1),
            (321, 'Eva Davis', 0.69, 22.1, 7, 'Ungraded', 1),
            (555, 'Sam Taylor', 0.99, 12.6, 9, 'Ungraded', 1),
            (777, 'Olivia White', 0.71, 28.4, 2, 'Ungraded', 1),
            (888, 'Michael Lee', 0.80, 16.8, 5, 'Ungraded', 1),
            (999, 'Sophia Harris', 0.95, 14.2, 8, 'Ungraded', 3);
        `);

    // console.log("attendance table seeded");
    await pool.query(`
            INSERT INTO test_attendance (zoomid, name, todays_attendance_hours, total_attendance_hours, total_days_attended, missing_streak)
            VALUES
            (123, 'John Doe', 4.5, 50.2, 30, 0),
            (456, 'Jane Smith', 5.8, 42.1, 28, 0),
            (789, 'Bob Johnson', 3.2, 60.0, 35, 27),
            (987, 'Alice Williams', 6.3, 38.7, 26, 0),
            (654, 'Charlie Brown', 4.7, 55.8, 32, 1),
            (321, 'Eva Davis', 5.1, 48.2, 29, 0),
            (555, 'Sam Taylor', 3.6, 51.4, 31, 0),
            (777, 'Olivia White', 7.2, 33.4, 22, 0),
            (888, 'Michael Lee', 4.8, 44.7, 27, 1),
            (999, 'Sophia Harris', 6.7, 40.1, 25, 0);
        `);

    // console.log("zoom polls table seeded");
    await pool.query(`
            INSERT INTO test_zoom_polls (zoom_poll_id, zoom_poll_date, zoom_poll_time, poor, average, good, response_rate, respondants, non_respondants)
            VALUES
            (101, '2023-01-01', 14.5, 2, 5, 3, 0.85, ARRAY[123, 456, 789], ARRAY[98]),
            (102, '2023-01-02', 12.3, 1, 4, 5, 0.92, ARRAY[987, 654, 321], ARRAY[121, 22]),
            (103, '2023-01-03', 15.8, 3, 2, 5, 0.78, ARRAY[555, 777, 888], ARRAY[]::INT[]),
            (104, '2023-01-04', 13.2, 2, 3, 5, 0.91, ARRAY[999, 123, 456], ARRAY[]::INT[]),
            (105, '2023-01-05', 11.7, 1, 4, 5, 0.88, ARRAY[321, 555, 777], ARRAY[]::INT[]),
            (106, '2023-01-06', 14.1, 3, 2, 5, 0.79, ARRAY[888, 999, 987], ARRAY[]::INT[]),
            (107, '2023-01-07', 16.6, 4, 1, 5, 0.94, ARRAY[654, 555, 321], ARRAY[]::INT[]),
            (108, '2023-01-08', 10.4, 1, 4, 5, 0.86, ARRAY[987, 777, 888], ARRAY[]::INT[]),
            (109, '2023-01-09', 13.8, 2, 3, 5, 0.89, ARRAY[456, 999, 555], ARRAY[]::INT[]),
            (110, '2023-01-10', 12.2, 1, 4, 5, 0.93, ARRAY[888, 777, 654], ARRAY[1]);
        `);

    // console.log("name picker table seeded");
    await pool.query(`
            INSERT INTO test_name_picker (zoomid, name)
            VALUES
            (123, 'John Doe'),
            (456, 'Jane Smith'),
            (789, 'Bob Johnson'),
            (987, 'Alice Williams'),
            (654, 'Charlie Brown'),
            (321, 'Eva Davis'),
            (555, 'Sam Taylor'),
            (777, 'Olivia White'),
            (888, 'Michael Lee'),
            (999, 'Sophia Harris');
        `);

    // console.log("bootcampers table seeded");
    await pool.query(`
            INSERT INTO test_bootcampers (zoomid, name)
            VALUES
            (123, 'John Doe'),
            (456, 'Jane Smith'),
            (789, 'Bob Johnson'),
            (987, 'Alice Williams'),
            (654, 'Charlie Brown'),
            (321, 'Eva Davis'),
            (555, 'Sam Taylor'),
            (777, 'Olivia White'),
            (888, 'Michael Lee'),
            (999, 'Sophia Harris');
        `);
  } catch (error) {
    console.error("Database reset failed: ", error);
  } finally {
    // End the pool
    await pool.end();
  }
}

(async () => {
  await resetTestDatabase();
})();
