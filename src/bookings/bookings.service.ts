import { JwtPayload } from "jsonwebtoken";
import { pool } from "../config/db";

const createBooking = async (payload: Record<string, unknown>) => {
  const { customer_id, vehicle_id, rent_start_date, rent_end_date } = payload;

  const vehicle = await pool.query(
    `SELECT daily_rent_price FROM vehicle WHERE id = $1`,
    [vehicle_id],
  );

  const startDate = new Date(rent_start_date as string);
  const endDate = new Date(rent_end_date as string);

  const totalDays =
    (endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24);

  const dailyRent = vehicle.rows[0].daily_rent_price;
  const totalRent = totalDays * dailyRent;

  const result = await pool.query(
    `INSERT INTO bookings(customer_id, vehicle_id, rent_start_date, rent_end_date, total_price) VALUES ($1, $2, $3, $4, $5) 
     RETURNING 
     id,
     customer_id,
     TO_CHAR(rent_start_date, 'YYYY-MM-DD') AS rent_start_date,
     TO_CHAR(rent_end_date, 'YYYY-MM-DD') AS rent_end_date, 
     total_price,  
     status,
     (SELECT json_build_object('vehicle_name', vehicle_name, 'daily_rent_price', daily_rent_price) FROM vehicle WHERE id = vehicle_id) AS vehicle`,
    [customer_id, vehicle_id, rent_start_date, rent_end_date, totalRent],
  );

  return result;
};

const getAllBookings = async (user: JwtPayload) => {
  const isAdmin = user.role === "admin";
  const id = user.id;

  const query = isAdmin
    ? `SELECT 
     id,
     customer_id,
     vehicle_id,
     TO_CHAR(rent_start_date, 'YYYY-MM-DD') AS rent_start_date,
     TO_CHAR(rent_end_date, 'YYYY-MM-DD') AS rent_end_date,
     total_price,
     status,
     (SELECT json_build_object('name', name, 'email', email) FROM users WHERE id = customer_id) AS customer,
     (SELECT json_build_object('vehicle_name', vehicle_name, 'daily_rent_price', daily_rent_price) FROM vehicle WHERE id = vehicle_id) AS vehicle
    FROM bookings;`
    : `SELECT 
     id,
     customer_id,
     vehicle_id,
     TO_CHAR(rent_start_date, 'YYYY-MM-DD') AS rent_start_date,
     TO_CHAR(rent_end_date, 'YYYY-MM-DD') AS rent_end_date,
     total_price,
     status,
     (SELECT json_build_object('vehicle_name', vehicle_name, 'daily_rent_price', daily_rent_price) FROM vehicle WHERE id = vehicle_id) AS vehicle
    FROM bookings WHERE customer_id = ${id};`;

  const result = await pool.query(query);
  return result;
};

const updateBooking = async (
  payload: Record<string, unknown>,
  id: string,
  user: JwtPayload,
) => {
  const isAdmin = user.role === "admin";
  // console.log(isAdmin);

  const { status } = payload;

  const query = isAdmin
    ? `UPDATE bookings SET status = $1 WHERE id = $2 RETURNING *, (SELECT json_build_object('availability_status', availability_status) FROM vehicle WHERE id = bookings.vehicle_id) AS vehicle`
    : `UPDATE bookings SET status = $1 WHERE id = $2 RETURNING *`;

  const result = await pool.query(query ,[status, id]);
  return result;
};

export const bookingService = {
  createBooking,
  getAllBookings,
  updateBooking,
};
