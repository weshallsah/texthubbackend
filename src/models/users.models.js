import mongoose from "mongoose";


const userSchema = mongoose.Schema(
    {
        phone: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            index: true,
        },
        name: {
            type: String,
            trim: true,
        },
        avatar: {
            type: String,
            trim: true,
        },
    },
    { timestamps: true }
)

export const User = mongoose.model("User", userSchema);