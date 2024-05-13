import mongoose from "mongoose";


const userSchema = mongoose.Schema(
    {
        Phone: {
            type: Number,
            require: true,
            unique: true,
        },
        name: {
            type: String
        },
        avatar: {
            type: String
        },
        email: {
            type: String,
            unique: true,
        },
        
    },
    { timestamps: true }
)

export const User = mongoose.model("User", userSchema);