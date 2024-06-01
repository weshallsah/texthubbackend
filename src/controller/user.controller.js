import { ApiResponse } from "../utils/ApiResponse.utils.js";
import { AsyncHandler } from "../utils/AsyncHandler.utils.js";
import { AuthCredential, signInWithPhoneNumber, getAuth } from "firebase/auth";
import { ApiError } from "../utils/ApiError.utils.js";
import { User } from "../models/users.models.js";
import { uploadcloud } from "../utils/cloudinary.utils.js";


const login = AsyncHandler(async (req, res) => {
    try {
        const { phone, name } = req.body;
        if (phone.trim() == "") {
            throw new ApiError(404, "phone number not found");
        }
        console.log(name, phone);
        const isuser = await User.findOne({ phone });
        if (isuser != null) {
            return res.status(200).json(
                new ApiResponse(200, isuser, "user login success")
            );
        }
        const avatarpath = req.files.avatar[0].path;
        let avatar = "";
        if (avatarpath != null) {
            const URL = await uploadcloud(avatarpath);
            avatar = URL.url;
            console.log(avatar);
        }
        const user = await User.create(
            {
                'name': name,
                'phone': phone,
                'avatar': avatar
            }
        );
        console.log(user);
        return res.status(200).json(
            new ApiResponse(200, user, "user login success")
        );
    } catch (error) {
        console.log(`error := ${error.message}`);
        return res.status(error.statusCode).json(
            new ApiResponse(error.statusCode, {}, error.message)
        );
    }
});

const userVerify = AsyncHandler(async (req, res) => {
    // console.log(req.qurey);
    try {
        const { code, phone } = req.params;
        console.log(`+${code}${phone}`);
        return res.status(200).json(
            new ApiResponse(
                200,
                {},
                "otp send successfully",
            )
        );
    } catch (error) {
        console.log(error);
        return res.status(error.statusCode).json({
            "message": error.message
        });
    }
});

const verifyotp = AsyncHandler(async (req, res) => {
    try {
        const { phone, otp } = req.params;
        console.log(phone, " ", otp);
        return res.status(200).json(
            new ApiResponse(
                200,
                {},
                "otp verifyed",
            )
        );
    } catch (error) {
        console.log(error);
        return res.status(error.statusCode).json({
            "message": error.message
        });
    }
});

export {
    userVerify,
    verifyotp,
    login
};