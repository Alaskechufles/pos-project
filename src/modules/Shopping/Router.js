import { Router } from "express";
import { index, show, store, update, destroy } from "./Controller.js";

export const shoppingRouter = Router();

shoppingRouter.get("/shopping", index);
shoppingRouter.get("/shopping/:id", show);
shoppingRouter.post("/shopping", store);
shoppingRouter.put("/shopping/:id", update);
shoppingRouter.delete("/shopping/:id", destroy); 
