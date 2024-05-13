import { Router } from "express";
import { userVerify } from "../controller/user.controller.js";


const routes = Router();

routes.route("/user").get(userVerify);

export default routes;