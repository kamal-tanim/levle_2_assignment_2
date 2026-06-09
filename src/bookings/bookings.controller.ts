import { Request, Response } from "express";
import { bookingService } from "./bookings.service";

const createBooking = async (req: Request, res: Response) => {
  const payload = req.body;
  try {
    const result = await bookingService.createBooking(payload);

    res.status(200).json({
      success: true,
      message: result.rows[0],
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};


export const bookingController = {
    createBooking
}