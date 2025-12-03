import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
        _id: String,
        username: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        firstName: String,
        email: String,
        lastName: String,
        dob: Date,
        role: {
            type: String,
            enum: ["AUTHOR", "ADMIN", "USER"],
            default: "USER",
        },
        authBooks: {
            type: [{
                bookId: String,
                title: String,
            }],
            default: [],
        },
        loginId: String,
        lastActivity: Date,
        totalActivity: String,
    },
    { collection: "users" }
);
export default userSchema;