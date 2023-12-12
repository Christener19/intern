import  pool from "../../dbIndex"

// Seed the engagement logger table

// Seed the attendance table

// Seed the Zoom polls table

// Seed the name picker table

// Seed the bootcampers table

async function TestSeedDatabase() {
    try {
        await pool.query(`
            INSERT INTO test_engagement_logger ()
        `)

    console.log("Test database seeded with data")
    } catch (error) {
    console.error("Database seeding failed: ", error);
} finally {
  // End the pool
  await pool.end();
}
}