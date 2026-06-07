import { Request, Response } from "express";
import { authService } from "./auth.service";

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
};
