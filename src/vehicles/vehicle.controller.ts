import { Request, Response } from "express";
import { vehicleService } from "./vehicle.service";

const createVehicle = async (req: Request, res: Response) => {
  const payload = req.body;

  try {
    const result = await vehicleService.createVehicle(payload);

    res.status(201).json({
      success: true,
      message: "Vehicles created successfully",
      data: result.rows,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
      error: err,
    });
  }
};

const getAllVehicle = async (req: Request, res: Response) => {
  try {
    const result = await vehicleService.getAllVehicle();

    res.status(200).json({
      success: true,
      message:
        result.rows.length === 0
          ? "No vehicles found"
          : "Vehicles retrieved successfully",
      data: result.rows,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
      error: err,
    });
  }
};

const getVehicleId = async (req: Request, res: Response) => {
  const vehicleId = req.params.vehicleId;
  try {
    const result = await vehicleService.getVehicleId(vehicleId as string);

    res.status(200).json({
      success: true,
      message: "Vehicles retrieved successfully",
      data: result.rows,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
      error: err,
    });
  }
};

const updateVehicle = async (req: Request, res: Response) => {
  const payload = req.body;
  const id = req.params.vehicleId;
  try {
    const result = await vehicleService.updateVehicle(payload, id as string);

    res.status(200).json({
      success: true,
      message: "Vehicle updated successfully",
      data: result.rows,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
      error: err,
    });
  }
};

const deleteVehicle = async (req: Request, res: Response) => {
  const vehicleId = req.params.vehicleId;
  try {
    await vehicleService.deleteVehicle(vehicleId as string);

    res.status(200).json({
      success: true,
      message: "Vehicle deleted successfully",
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
      error: err,
    });
  }
};

export const vehicleController = {
  createVehicle,
  getAllVehicle,
  getVehicleId,
  updateVehicle,
  deleteVehicle,
};
