import mongoose from "mongoose";

const bookshelfSchema = new mongoose.Schema(
    {
        _id: String,
        userId: { type: String, required: true, ref: "UserModel" },
        bookId: { type: String, required: true, ref: "BookModel" },
        shelf: {
            type: String,
            enum: ["want", "reading", "read"],
            default: "want",
            required: true,
        },
        dateFinished: { type: Date, default: null },
    },
    {
        collection: "usershelves",
        timestamps: true,
    }
);

export default bookshelfSchema;