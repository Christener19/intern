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
            INSERT INTO test_engagement_logger (recordid, zoomid, name, poll_completion_rate, screen_share_time, screen_share_switch_freq, average_engagement_grade, week_number)
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

    console.log("Test database seeded with data")
    } catch (error) {
    console.error("Database seeding failed: ", error);
} finally {
  // End the pool
  await pool.end();
}
}