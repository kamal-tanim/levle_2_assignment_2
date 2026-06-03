import { pool } from "../config/db";
import bcrypt from "bcrypt";

const createUsers = async (payload: Record<string, unknown>) => {
  const { name, email, password, phone, role } = payload;

  const hashedPass = await bcrypt.hash(password as string, 10);

  const result = await pool.query(
    `INSERT INTO users(name , email, password, phone, role) VALUES($1, $2, $3, $4, $5) RETURNING *`,
    [name, email, hashedPass, phone, role],
  );
  return result;
};

const getAllUsers = async () => {
  const result = await pool.query(`SELECT * FROM users`);
  return result;
};

const getSingleUser = async (id: string) => {
  const result = await pool.query(
    `SELECT id, name, email, phone, role FROM users WHERE id = $1`,
    [id],
  );
  return result;
};

const updateUser = async (payload: Record<string, unknown>, id: string) => {
  const { name, phone } = payload;
  const result = await pool.query(
    `UPDATE users SET name = $1, phone = $2 WHERE ID = $3 RETURNING id, name,email, phone, role`,
    [name, phone, id],
  );

  return result;
};

const deleteUser = async (id: string) => {
  const result = await pool.query(
    `DELETE FROM users WHERE id = $1`,
    [id],
  );
  return result;
};

export const userService = {
  createUsers,
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
};
