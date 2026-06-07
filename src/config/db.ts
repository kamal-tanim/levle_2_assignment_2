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

  await pool.query(`
    CREATE TABLE IF NOT EXISTS vehicle(
    id SERIAL PRIMARY KEY,
    vehicle_name VARCHAR(200) NOT NULL,
    type VARCHAR(10) NOT NULL CHECK (type IN ('car', 'bike', 'van', 'SUV')),
    registration_number VARCHAR(100) UNIQUE NOT NULL,
    daily_rent_price NUMERIC(10, 2) NOT NULL CHECK (daily_rent_price > 0),
    availability_status VARCHAR(20) NOT NULL CHECK (availability_status IN ('available', 'booked'))
    )`);
};

export default initDb;
