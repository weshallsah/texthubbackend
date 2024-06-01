import mongoose from "mongoose";
import { DB_Name } from "../constant.js";



export const connectDB = async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_Name}?retryWrites=true&w=majority`)
        console.log(`mongoDB Connected`);
    } catch (error) {
        console.error('Failed to Connect MongoDB', error);
        process.exit(1);
    }
};