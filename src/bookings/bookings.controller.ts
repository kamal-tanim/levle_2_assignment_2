import { Request, Response } from "express";
import { bookingService } from "./bookings.service";
import { JwtPayload } from "jsonwebtoken";

const createBooking = async (req: Request, res: Response) => {
  const payload = req.body;
  try {
    const result = await bookingService.createBooking(payload);

    res.status(200).json({
      success: true,
      message: "Booking created successfully",
      data: result.rows[0],
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const getAllBookings = async (req: Request, res: Response) => {
  const user = req.user;
  try {
    const result = await bookingService.getAllBookings(user as JwtPayload);

    res.status(200).json({
      success: true,
      message: "Bookings retrieved successfully",
      data: result.rows,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const updateBooking = async (req: Request, res: Response) => {
  const payload = req.body;
  const id = req.params.bookingId;
  const user = req.user;
  try {
    const result = await bookingService.updateBooking(
      payload,
      id as string,
      user as JwtPayload,
    );

    res.status(200).json({
      success: true,
      message:
        user!.role === "admin"
          ? "Booking marked as returned. Vehicle is now available"
          : "Booking cancelled successfully",
      data: result.rows[0],
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
      error: err,
    });
  }
};

export const bookingController = {
  createBooking,
  getAllBookings,
  updateBooking,
};
