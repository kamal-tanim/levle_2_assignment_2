import bcrypt from "bcrypt";
import { pool } from "../config/db";
import jwt from "jsonwebtoken";
import config from "../config";

const registerUsers = async (payload: Record<string, unknown>) => {
  const { name, email, password, phone, role } = payload;

  const hashedPass = await bcrypt.hash(password as string, 10);

  const result = await pool.query(
    `INSERT INTO users(name , email, password, phone, role) VALUES($1, $2, $3, $4, $5) RETURNING *`,
    [name, email, hashedPass, phone, role],
  );
  return result;
};

const loginUser = async (email: string, password: string) => {
  const user = await pool.query(`SELECT * FROM users WHERE email=$1`, [email]);

  if (user.rows.length === 0) {
    throw new Error("user not found");
  }

  const matchedPassword = await bcrypt.compare(password, user.rows[0].password);

  if (!matchedPassword) {
    throw new Error("invalid credential");
  }

  const jwtPayload = {
    id: user.rows[0].id,
    name: user.rows[0].name,
    email: user.rows[0].email,
    role: user.rows[0].role,
  };
  const jwtSecret = config.secret;

  const token = jwt.sign(jwtPayload, jwtSecret as string, { expiresIn: "7d" });
  // console.log(token);

  return { token, user: user.rows[0] };
};

export const authService = {
  loginUser,
  registerUsers,
};
