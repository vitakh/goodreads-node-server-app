import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
    {
        _id: String,
        title: { type: String, required: true },
        authors: { type: [String], default: [] },
    },
    {
        collection: "books",
    }
);

export default bookSchema;