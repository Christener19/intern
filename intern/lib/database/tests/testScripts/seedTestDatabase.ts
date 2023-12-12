import  pool from "../../dbIndex"

// Seed the engagement logger table

// Seed the attendance table

// Seed the Zoom polls table

// Seed the name picker table

// Seed the bootcampers table

async function TestSeedDatabase() {
    try {
        console.log("engagement logger table seeded")
        await pool.query(`
            INSERT INTO test_engagement_logger (zoomid, name, poll_completion_rate, screen_share_time, screen_share_switch_freq, average_engagement_grade, week_number)
            VALUES
            (123, 'John Doe', 0.75, 20.5, 5, 'Good', 1),
            (456, 'Jane Smith', 0.85, 15.2, 8, 'Excellent', 2),
            (789, 'Bob Johnson', 0.62, 30.0, 3, 'Fair', 3),
            (987, 'Alice Williams', 0.92, 18.3, 6, 'Excellent', 4),
            (654, 'Charlie Brown', 0.78, 25.7, 4, 'Good', 5),
            (321, 'Eva Davis', 0.69, 22.1, 7, 'Fair', 6),
            (555, 'Sam Taylor', 0.88, 12.6, 9, 'Excellent', 7),
            (777, 'Olivia White', 0.71, 28.4, 2, 'Good', 8),
            (888, 'Michael Lee', 0.80, 16.8, 5, 'Fair', 9),
            (999, 'Sophia Harris', 0.95, 14.2, 8, 'Excellent', 10);
        `);

        console.log("attendance table seeded")
        await pool.query(`
            INSERT INTO test_attendance (zoomid, name, todays_attendance_hours, total_attendance_hours, total_days_attended, missing_streak)
            VALUES
            (123, 'John Doe', 4.5, 50.2, 30, 0),
            (456, 'Jane Smith', 5.8, 42.1, 28, 0),
            (789, 'Bob Johnson', 3.2, 60.0, 35, 1),
            (987, 'Alice Williams', 6.3, 38.7, 26, 0),
            (654, 'Charlie Brown', 4.7, 55.8, 32, 1),
            (321, 'Eva Davis', 5.1, 48.2, 29, 0),
            (555, 'Sam Taylor', 3.6, 51.4, 31, 0),
            (777, 'Olivia White', 7.2, 33.4, 22, 0),
            (888, 'Michael Lee', 4.8, 44.7, 27, 1),
            (999, 'Sophia Harris', 6.7, 40.1, 25, 0);
        `);

        console.log("zoom polls table seeded")
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

        console.log("name picker table seeded")
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

        console.log("bootcampers table seeded")
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


    console.log("Test database seeded with data")
    } catch (error) {
    console.error("Database seeding failed: ", error);
} finally {
  // End the pool
  await pool.end();
}
}

(async () => { await TestSeedDatabase(); })()