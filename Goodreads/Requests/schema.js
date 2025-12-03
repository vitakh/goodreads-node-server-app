import mongoose from "mongoose";
const requestSchema = new mongoose.Schema({
        _id: String,
        userId: {
            type: String,
            ref: "UserModel"
        },
        bookId: String,
        title: String,
    },
    { collection: "requests" }
);
export default requestSchema;