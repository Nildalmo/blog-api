import { Router } from "express";
import * as userController from "../../controllers/UserControllers";
import { requestValidation } from './../../middlewares/requestValidations';
import { createUser } from "../../services/validations/createUser";
import { apiAuth } from "../../middlewares/apiAuth";


const userRoutes = Router();

userRoutes.post(
    "/users",
    requestValidation(createUser),
    userController.saveUser
);
userRoutes.get("/users", apiAuth,userController.getUsers);
userRoutes.get("/users/:id", apiAuth,userController.getUser);

export { userRoutes };