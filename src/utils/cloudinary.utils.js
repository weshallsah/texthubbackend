import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config({ path: ".env" });

// console.log(process.env.CLOUD_NAME);

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadcloud = async (localfile) => {
    try {
        if (localfile == null) {
            return null;
        }
        const res = await cloudinary.uploader.upload(localfile, { resource_type: 'auto' });
        fs.unlinkSync(localfile);
        return res;
    } catch (error) {
        fs.unlinkSync(localfile);
        console.log('error occure', error);
        return null;
    }
};

export { uploadcloud };