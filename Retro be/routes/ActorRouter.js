import { Router } from "express";
import { deleteActor, getActorById, getAllActors, postActor, updateActor } from "../controller/ActorController.js";
// import { verfyAccess } from "../Middleware/AuthMiddleware.js";

export const actorRoute=Router()

actorRoute.get("/", getAllActors);
  actorRoute.get("/:id",getActorById );
  
  actorRoute.post("/",postActor );
  
  actorRoute.put("/:id", updateActor);
  
  actorRoute.delete("/:id",deleteActor);
  