import { Router } from "express";
import * as userController from "../../controllers/UserControllers";


const userRoutes = Router();


userRoutes.post("/users", userController.saveUser);
userRoutes.get("/users", userController.getUser);
userRoutes.get("/users/:id", userController.getUser);


export { userRoutes };