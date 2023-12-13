import { Router } from "express";
import * as userController from "../../controllers/UserControllers";
import { requestValidation } from './../../middlewares/requestValidations';
import { createUser } from "../../services/validations/createUser";


const userRoutes = Router();

userRoutes.post(
    "/users",
    requestValidation(createUser),
    userController.saveUser
);
userRoutes.get("/users", userController.getUsers);
userRoutes.get("/users/:id", userController.getUser);

export { userRoutes };