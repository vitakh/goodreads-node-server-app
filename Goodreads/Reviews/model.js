import mongoose from "mongoose";
import reviewsSchema from "./schema.js";

const ReviewModel = mongoose.model('ReviewModel', reviewsSchema);

export default ReviewModel;