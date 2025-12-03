import express from 'express';
import cors from "cors";
import mongoose from "mongoose";
import SearchRoutes from './Goodreads/Search/routes.js';
import UserRoutes from "./Goodreads/Users/routes.js";
import BookShelfRoutes from "./Goodreads/BookShelf/routes.js";
import BooksRoutes from './Goodreads/Books/routes.js';
import RequestRoutes from './Goodreads/Requests/routes.js';
import "dotenv/config";
import session from "express-session";
import ReviewsRoutes from './Goodreads/Reviews/routes.js';

const CONNECTION_STRING = process.env.DATABASE_CONNECTION_STRING || "mongodb://localhost:27017/goodreads"
mongoose.connect(CONNECTION_STRING);
const app = express()
app.use(cors(
    {
        credentials: true,
        origin: process.env.CLIENT_URL || "http://localhost:3000",
    }
));
const sessionOptions = {
    secret: process.env.SESSION_SECRET || "goodreads",
    resave: false,
    saveUninitialized: false,
};
if (process.env.SERVER_ENV !== "development") {
    sessionOptions.proxy = true;
    sessionOptions.cookie = {
        sameSite: "none",
        secure: true,
        domain: process.env.SERVER_URL,
    };
}
app.use(session(sessionOptions));
app.use(express.json());
UserRoutes(app);
SearchRoutes(app);
BookShelfRoutes(app);
BooksRoutes(app);
ReviewsRoutes(app);
RequestRoutes(app);
const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});