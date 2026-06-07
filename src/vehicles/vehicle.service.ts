import { pool } from "../config/db";

const createVehicle = async (payload: Record<string, unknown>) => {
  const {
    vehicle_name,
    type,
    registration_number,
    daily_rent_price,
    availability_status,
  } = payload;

  const result = await pool.query(
    `INSERT INTO vehicle(vehicle_name, type, registration_number, daily_rent_price, availability_status) VALUES($1, $2, $3, $4, $5) RETURNING * `,
    [
      vehicle_name,
      type,
      registration_number,
      daily_rent_price,
      availability_status,
    ],
  );

  return result;
};

const getAllVehicle = async () => {
  const result = await pool.query(`SELECT * FROM vehicle`);
  return result;
};

const getVehicleId = async (id: string) => {
  const result = await pool.query(
    `SELECT id, vehicle_name, type, registration_number, daily_rent_price, availability_status FROM vehicle WHERE id=$1`,
    [id],
  );

  return result;
};

const updateVehicle = async (payload: Record<string, unknown>, id: string) => {
  const {
    vehicle_name,
    type,
    registration_number,
    daily_rent_price,
    availability_status,
  } = payload;

  // const id = req.params.vehicleI

  const result = await pool.query(
    `UPDATE vehicle SET vehicle_name=$1, type=$2, registration_number=$3, daily_rent_price=$4, availability_status=$5 WHERE id = $6 RETURNING *`,
    [
      vehicle_name,
      type,
      registration_number,
      daily_rent_price,
      availability_status,
      id,
    ],
  );

  return result;
};

const deleteVehicle = async (id: string) => {
  const result = await pool.query(`DELETE FROM vehicle WHERE id = $1`, [id]);

  return result;
};

export const vehicleService = {
  createVehicle,
  getAllVehicle,
  getVehicleId,
  updateVehicle,
  deleteVehicle,
};
