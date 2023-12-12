// import pg (node-postgres) lin
import pg from 'pg'
import dotenv from 'dotenv'

dotenv.config();

// Get the db connection string from env file
const connectionString : string | undefined  = process.env.DATABASE_URL ;

// check if the connection is okay, if not, throw error
if (!connectionString) {
    throw new Error(
        'No database connection, check if your env loads in correctly'
    );
}

// export new instance of PG pool to be used to interact with the db
export const pool = new pg.Pool({  
    // pass the connection string
    connectionString,
    // set the max connections to prevent tripping out the database (max 5)
    max: 4,
})