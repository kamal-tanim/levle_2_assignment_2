import express, { Request, Response } from "express";

import config from "./config";
import initDb, { pool } from "./config/db";
import { userRoutes } from "./users/users.route";


const app = express();
const port = config.port;

app.use(express.json());


// initializing data base 
initDb()


// users apis

app.use("/users", userRoutes)

app.get("/", (req: Request, res: Response) => {
  res.send("Hello Nishi");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
