import { Router } from "express";
import { vehicleController } from "./vehicle.controller";
import auth from "../middleware/auth";

const route = Router();

route.post("/", auth("admin"), vehicleController.createVehicle);

route.get("/", vehicleController.getAllVehicle)

route.get("/:vehicleId", vehicleController.getVehicleId)

route.put("/:vehicleId", auth("admin"), vehicleController.updateVehicle)

route.delete("/:vehicleId",auth("admin") , vehicleController.deleteVehicle)

export const vehicleRouter = route;
