import { Router } from "express";
import { index, show, store, update, destroy } from "./Controller.js";

export const salesRouter = Router();

salesRouter.get("/sales", index);
salesRouter.get("/sales/:id", show);
salesRouter.post("/sales", store);
salesRouter.put("/sales/:id", update);
salesRouter.delete("/sales/:id", destroy); 
