import { Router } from "express";
import { index, show, store, update, destroy } from "./Controller.js";

export const productRouter = Router();

productRouter.get("/product", index);
productRouter.get("/product/:id", show);
productRouter.post("/product", store);
productRouter.put("/product/:id", update);
productRouter.delete("/product/:id", destroy); 
