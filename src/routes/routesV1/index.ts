import{Router} from "express";
import authRoutes from "./authRoutes";
import { userRoutes } from "./userRoutes";
import { postRoutes } from "./postRoutes";

const RoutesV1 = Router();

RoutesV1.use(authRoutes);
RoutesV1.use(userRoutes);
RoutesV1.use(postRoutes);



export default RoutesV1;