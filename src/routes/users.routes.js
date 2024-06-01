import { Router } from "express";
import { login, userVerify, verifyotp } from "../controller/user.controller.js";
import { upload } from "../middleware/multer.middleware.js";
import multer from "multer";


const routes = Router();

const storage = multer.memoryStorage();

routes.route("/user/:code/:phone").get(userVerify);

routes.route("/verify/:phone/:otp").get(verifyotp);

routes.route("/login").post(
    // multer({ storage: storage }).single("avatar"),
    upload.fields([
        {
            name: 'avatar',
            maxCount: 1,
        }
    ]),
    login
);

export default routes;