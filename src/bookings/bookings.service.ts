import { pool } from "../config/db";

const createBooking = async (payload: Record<string, unknown>) => {
  const { customer_id, vehicle_id, rent_start_date, rent_end_date } = payload;

  const vehicle = await pool.query(
    `SELECT vehicle_name, daily_rent_price FROM vehicle WHERE id = $1`,
    [vehicle_id],
  );

  // console.log(vehicle.rows[0]);

  const dailyRent = vehicle.rows[0].daily_rent_price;
  // console.log(dailyRent)

  const startDate = new Date(rent_start_date as string);
  const endDate = new Date(rent_end_date as string);
  // console.log({startDate, endDate});

  const totalDays = endDate.getDay() - startDate.getDay();
  // console.log(totalDays);

  const totalRent = totalDays * dailyRent;
  // console.log(totalRent)

  const result = await pool.query(
    `INSERT INTO bookings(customer_id, vehicle_id, rent_start_date, rent_end_date, total_price, vehicle) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
    [
      customer_id,
      vehicle_id,
      rent_start_date,
      rent_end_date,
      totalRent,
      vehicle,
    ],
  );

  return result;
};

export const bookingService = {
  createBooking,
};
