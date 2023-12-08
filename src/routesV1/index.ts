import{Router} from "express";
import authRoutes from "../routes/routesV1/authRoutes";
import { userRoutes } from "../routes/routesV1/userRoutes";
import { postRoutes } from "../routes/routesV1/postRoutes";


const RoutesV1 = Router();

RoutesV1.use(authRoutes);
RoutesV1.use(userRoutes);
RoutesV1.use(postRoutes);



export default RoutesV1;