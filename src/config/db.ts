import { Pool } from "pg";
import config from ".";


export const pool = new Pool({
  connectionString: config.connection_STR,
});

const initDb = async () => {
  await pool.query(`
        CREATE TABLE IF NOT EXISTS users(
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(250) UNIQUE NOT NULL,
        password VARCHAR(200) NOT NULL,
        phone VARCHAR(50) NOT NULL,
        role VARCHAR(20) NOT NULL
        )
        `);
};

export default initDb

