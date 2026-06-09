import { Request, Response } from "express";
import { authService } from "./auth.service";


const registerUsers = async (req: Request, res: Response) => {
  try {
    const result = await authService.registerUsers(req.body);
    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: result.rows[0],
    });
  } catch (err: any) {
    return res.status(409).json({
      success: false,
      message: err.message,
    });
  }
};

const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const result = await authService.loginUser(email, password);
    res.status(200).json({
      success: true,
      message: "User password matched",
      data: result,
    });
  } catch (err: any) {
    res.status(404).json({
      success: false,
      message: "wrong credentials",
    });
  }
};

export const authController = {
  loginUser,
  registerUsers,
};
