import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";
import { pool } from "../config/db";

const auth = (...roles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    // console.log(token)
    if (!token) {
      res.json({
        success: false,
        message: "You are not authorized",
      });
      return;
    }

    const decoded = jwt.verify(token, config.secret as string) as JwtPayload;

    const user = await pool.query(`SELECT * FROM users WHERE email=$1`, [
      decoded.email,
    ]);

    if (user.rows.length === 0) {
      res.json({
        success: false,
        message: "user not found",
      });
      return;
    }

    req.user = decoded;

    if (!roles.includes(decoded.role)) {
      res.json({
        success: false,
        message: "you are not admin",
      });
      return;
    }

    next();
  };
};

export default auth;
