"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import pg (node-postgres) lin
var pg = require("pg");
// import * as dotenv from 'dotenv'
// dotenv.config();
// Get the db connection string from env file
var connectionString = process.env.DATABASE_URL;
// check if the connection is okay, if not, throw error
if (!connectionString) {
    throw new Error('No database connection, check if your env loads in correctly');
}
// export new instance of PG pool to be used to interact with the db
var pool = new pg.Pool({
    // pass the connection string
    connectionString: connectionString,
    // set the max connections to prevent tripping out the database (max 5)
    max: 4,
});
exports.default = pool;
