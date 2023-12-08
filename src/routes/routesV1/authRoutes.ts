import{Router} from "express";

const RoutesV1 = Router();

RoutesV1.post("/login", (req, res) =>{
    res.send("Realiza Login.");
})

export default RoutesV1;