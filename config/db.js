import pg from 'pg';
import dotenv from "dotenv";
import dotenvExpand from "dotenv-expand";

const appEnv = dotenv.config();
dotenvExpand.expand(appEnv);

const pgClient = new pg.Pool({
    connectionString: process.env.DB_CONNECTION_STRING
});

export default pgClient;