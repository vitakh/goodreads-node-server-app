import express from 'express';
import cors from "cors";
import SearchRoutes from './Goodreads/Search/routes.js';
import db from "./Goodreads/Database/index.js";
import UserRoutes from "./Goodreads/Users/routes.js";
import "dotenv/config";
import session from "express-session";
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
UserRoutes(app, db);
SearchRoutes(app);
app.listen(process.env.PORT || 4000);