import model from "./model.js";
import { v4 as uuidv4 } from "uuid";
import UserModel from "../Users/model.js";

export default function ReviewsDao() {
    const createReview = (review) => {
        const newReview = {...review, createAt: new Date(), _id: uuidv4() };
        return model.create(newReview);
    }

    const findReviewById = (reviewId) => model.findById(reviewId);
    
    const findReviewsByBook = async (bookId) => {
        const reviews = await model.find({ bookId }).exec();
        const reviewsWithAuthor = await Promise.all(
            reviews.map(async (r) => {
                const user = await UserModel.findById(r.authorId).exec();
                return { ...r.toObject(), author: user};
            })
        );
        return reviewsWithAuthor;
    }

    const deleteReview = (reviewId) => model.findByIdAndDelete(reviewId);

    const updateReview = (reviewId, review) => model.updateOne({ _id: reviewId }, { $set: review });

    const findAllReviews = () => model.find().populate("authorId", "username").exec();

    const findReviewsByAuthor = (authorId) => model.find({authorId: authorId}).populate("authorId", "username").exec();

    const findRecentReviews = () =>
        model.find().populate("authorId", "username").populate("bookId", "title").sort({ createdAt: -1 }).limit(5).exec();

    const findRecentReviewUser = (authorId) => model.find({authorId: authorId}).populate("authorId", "username").populate("bookId", "title").sort({ createdAt: -1 }).limit(5).exec();


    return {
        createReview, findReviewById, findReviewsByBook, deleteReview,
        updateReview, findAllReviews, findReviewsByAuthor, findRecentReviews,
        findRecentReviewUser
    }

}
