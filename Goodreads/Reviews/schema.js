import mongoose from "mongoose";

const reviewsSchema = mongoose.Schema({
    _id: String,
    review: String,
    title: String,
    bookId:
    {
        type: String, 
        ref: "BookModel"
    },
    authorId: {
        type: String,
        ref: 'UserModel'
    }
}, {collection: 'reviews', timestamps: true});

export default reviewsSchema;