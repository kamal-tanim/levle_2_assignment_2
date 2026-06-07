import express, { Request, Response } from "express";

import config from "./config";
import initDb, { pool } from "./config/db";
import { userRoutes } from "./users/users.route";
import { authRouter } from "./auth/auth.route";
import { vehicleRouter } from "./vehicles/vehicle.route";


const app = express();
const port = config.port;

app.use(express.json());


// initializing data base 
initDb()

// users apis
app.use("/api/v1/users", userRoutes)

// auth apis
app.use("/api/v1/auth", authRouter)

// vehicle apis
app.use("/api/v1/vehicle", vehicleRouter)


app.get("/", (req: Request, res: Response) => {
  res.send("Hello Nishi");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
