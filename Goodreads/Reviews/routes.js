import ReviewsDao from "./dao.js";

export default function ReviewsRoutes(app) {
    const reviewDao = ReviewsDao();
    
    const createReview = async (req, res) => {
        const review = req.body;
        const currentUser = req.session["currentUser"];
        review.authorId = currentUser._id;
        const reviewToPost = await reviewDao.createReview(review);
        res.json(reviewToPost);
    }

    const findReviewById = async (req, res) => {
        const reviewId = req.params.reviewId;
        const review = await reviewDao.findReviewById(reviewId);
        res.json(review);
    }

    const findReviewsByBook = async (req, res) => {
        const bookId = req.params.bookId;
        const reviews = await reviewDao.findReviewsByBook(bookId);
        res.json(reviews);
    }

    const deleteReview = async (req, res) => {
        const reviewId = req.params.reviewId;
        const status = await reviewDao.deleteReview(reviewId);
        res.json(status);
    }

    const updateReview = async (req, res) => {
        const reviewId = req.params.reviewId;
        const reviewUpdates = req.body;
        const status = await reviewDao.updateReview(reviewId, reviewUpdates);
        res.json(status);
    }

    const findAllReviews = async (req, res) => {
        const reviews = await reviewDao.findAllReviews();
        res.json(reviews);
    }

    const findReviewsByAuthor = async (req, res) => {
        const authorId = req.params.authorId;
        const reviews = await reviewDao.findReviewsByAuthor(authorId);
        res.json(reviews); 
    }

    app.post("/api/reviews", createReview);
    app.get("/api/reviews/:reviewId", findReviewById);
    app.get("/api/books/:bookId/reviews", findReviewsByBook);
    app.get("/api/users/:authorId/reviews", findReviewsByAuthor);
    app.get("/api/reviews", findAllReviews)
    app.delete("/api/reviews/delete/:reviewId", deleteReview);
    app.put("/api/reviews/update/:reviewId", updateReview);
}