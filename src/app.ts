import express, { Request, Response } from "express"
import initDb from "./config/db";
import { userRouter } from "./users/users.route";
import { authRouter } from "./auth/auth.route";
import { vehicleRouter } from "./vehicles/vehicle.route";
import { bookingRouter } from "./bookings/bookings.route";

const app = express();

app.use(express.json());

// initializing data base
initDb();

// users apis
app.use("/api/v1/users", userRouter);

// auth apis
app.use("/api/v1/auth", authRouter);

// vehicle apis
app.use("/api/v1/vehicle", vehicleRouter);

// booking apis
app.use("/api/v1/bookings", bookingRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World");
});

export default app;
