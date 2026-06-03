import dotenv from "dotenv";
import { Pool } from "pg";

dotenv.config();

const config = {
    connection_STR: process.env.CONNECTION_STR,
    port: process.env.PORT,
};

export default config;
