"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pool = void 0;
// import pg (node-postgres) lin
var pg_1 = require("pg");
var dotenv_1 = require("dotenv");
dotenv_1.default.config();
// Get the db connection string from env file
var connectionString = process.env.DATABASE_URL;
// check if the connection is okay, if not, throw error
if (!connectionString) {
    throw new Error('No database connection, check if your env loads in correctly');
}
// export new instance of PG pool to be used to interact with the db
exports.pool = new pg_1.default.Pool({
    // pass the connection string
    connectionString: connectionString,
    // set the max connections to prevent tripping out the database (max 5)
    max: 4,
});
