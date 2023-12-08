import { Router } from "express";
import { UserController } from "../../controllers/UserControllers";


const userRoutes = Router();
const userController = new UserController();

userRoutes.post("/users", userController.saveUser);
userRoutes.get("/users", userController.getUser);
userRoutes.get("/users", userController.getUser);


export { userRoutes };