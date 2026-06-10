import { Request, Response } from "express";
import { userService } from "./user.service";
import { JwtPayload } from "jsonwebtoken";

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await userService.getAllUsers();
    res.status(200).json({
      success: true,
      message: "Users retrieved successfully",
      data: result.rows,
    });
  } catch (err: any) {
    return res.status(404).json({
      success: false,
      message: err.message,
      error: err,
    });
  }
};

const updateUser = async (req: Request, res: Response) => {
  const id = req.params.id;
  const user = req.user;

  try {
    const result = await userService.updateUser(
      req.body,
      id as string,
      user as JwtPayload,
    );

    res.status(200).json({
      success: true,
      message: "User update successfully",
      data: result!.rows,
    });
  } catch (err: any) {
    return res.status(404).json({
      success: false,
      message: err.message,
      error: err,
    });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const result = await userService.deleteUser(id as string);

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
      data: result.rows,
    });
  } catch (err: any) {
    return res.status(404).json({
      success: false,
      message: err.message,
      error: err,
    });
  }
};

export const userController = {
  getAllUsers,
  updateUser,
  deleteUser,
};
