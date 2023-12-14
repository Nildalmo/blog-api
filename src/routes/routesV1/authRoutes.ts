import{Router} from "express";
import { login } from "../../controllers/UserControllers";
import { requestValidation } from "../../middlewares/requestValidations";
import { loginvalidation } from "../../services/validations/loginValidation";


const authRoutes = Router();

authRoutes.post("/login", requestValidation(loginvalidation), login);

export default authRoutes;