import{Router} from "express";
import { login } from "../../controllers/UserControllers";


const authRoutes = Router();

authRoutes.post("/login", login);

export default authRoutes;