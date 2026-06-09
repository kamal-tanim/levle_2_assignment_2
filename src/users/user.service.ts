import { pool } from "../config/db";
import bcrypt from "bcrypt";

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

const updateUser = async (
  payload: Record<string, unknown>,
  id: string,
  user: any,
) => {
  const { name, phone, password, role } = payload;

  const owner = await pool.query(
    `SELECT email, role FROM users WHERE id = $1`,
    [id],
  );
  if (owner.rows.length === 0) {
    throw new Error("not found the user");
  }

  const realOwner =
    owner.rows[0].email === user.email && owner.rows[0].role === user.role;
  const isAdmin = user.role === "admin";

  if (isAdmin) {
    const result = await pool.query(
      `UPDATE users SET name = COALESCE($1, name), phone = COALESCE($2, phone), role = COALESCE($3, role) WHERE id = $4 RETURNING id, name, email, phone, role`,
      [name || null, phone || null, role || null, id],
    );
    return result;
  }

  if (realOwner) {
    
    let hashedPass = null;
    if (password) {
      hashedPass = await bcrypt.hash(password as string, 10);
    }

    const result = await pool.query(
      `UPDATE users SET name = COALESCE($1, name), phone = COALESCE($2, phone), password = COALESCE($3, password) WHERE id = $4 RETURNING id, name, email, phone, role`,
      [name || null, phone || null, hashedPass || null, id],
    );
    return result;
  }
};

const deleteUser = async (id: string) => {
  const result = await pool.query(`DELETE FROM users WHERE id = $1`, [id]);
  return result;
};

export const userService = {
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
};
