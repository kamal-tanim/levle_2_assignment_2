import bcrypt from "bcrypt";
import { pool } from "../config/db";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";

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
};
