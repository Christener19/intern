// import pg (node-postgres) lin
import * as pg from "pg";
import * as dotenv from "dotenv";

dotenv.config({ path: "./.env.local" });

// Get the db connection string from env file
const connectionString = process.env.DATABASE_URL!;

//console.log(`connections string = ${connectionString}`)

// check if the connection is okay, if not, throw error
if (!connectionString) {
  throw new Error(
    "No database connection, check if your env loads in correctly"
  );
}

// export new instance of PG pool to be used to interact with the db
const pool = new pg.Pool({
  // pass the connection string
  connectionString,
  // set the max connections to prevent tripping out the database (max 60 on supabase)

  max: 10,
  connectionTimeoutMillis: 40000,
  idleTimeoutMillis: 40000,

});

export default pool;
