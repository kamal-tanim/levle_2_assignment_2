import { Request, Response } from "express";
import { userService } from "./user.service";

const createUser = async (req: Request, res: Response) => {
  try {
    const result = await userService.createUsers(req.body);
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
    });
  }
};

const getSingleUser = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const result = await userService.getSingleUser(id as string);

    res.status(200).json({
      success: true,
      message: "User retrieved successfully",
      data: result.rows,
    });
  } catch (err: any) {
    return res.status(404).json({
      success: false,
      message: err.message,
    });
  }
};

const updateUser = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const result = await userService.updateUser(req.body, id as string);

    res.status(200).json({
      success: true,
      message: "User update successfully",
      data: result.rows,
    });
  } catch (err: any) {
    return res.status(404).json({
      success: false,
      message: err.message,
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
    });
  }
};

export const userController = {
  createUser,
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
};
