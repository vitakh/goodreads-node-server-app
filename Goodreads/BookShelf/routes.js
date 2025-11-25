import BooksShelfDao from "./dao.js";
import BooksDao from "../Books/dao.js"; // <-- Correct path!

export default function BookShelfRoutes(app, db) {
    const shelfDao = BooksShelfDao(db);
    const booksDao = BooksDao(db);

    const getAllBookshelves = (req, res) => {
        const shelves = shelfDao.findAllShelves();
        res.json(shelves);
    };

    // GET /api/bookshelf/user/:userId - get shelves for a specific user
    const getUserBookshelves = (req, res) => {
        const userId = req.params.userId;
        const shelves = shelfDao.findShelvesByUser(userId);
        res.json(shelves);
    };

    const getUserBookshelvesWithBooks = (req, res) => {
        const userId = req.params.userId;
        const shelves = shelfDao.findShelvesByUser(userId);
        const result = shelves.map(shelf => {
            const book = booksDao.findBookById(shelf.bookId);
            return {
                ...shelf,
                book: book || null
            };
        });
        res.json(result);
    };

    app.get("/api/bookshelf", getAllBookshelves);
    app.get("/api/bookshelf/user/:userId", getUserBookshelvesWithBooks);
}