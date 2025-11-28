import BooksShelfDao from "./dao.js";
import BooksDao from "../Books/dao.js";

export default function BookShelfRoutes(app) {
    const shelfDao = BooksShelfDao();
    const booksDao = BooksDao();

    const getAllBookshelves = async (req, res) => {
        const shelves = await shelfDao.findAllShelves();
        res.json(shelves);
    };

    const createBookshelf = async (req, res) => {
        const shelf = await shelfDao.createShelfEntry(req.body);
        res.json(shelf);
    };

    // GET /api/bookshelf/user/:userId - get shelves for a specific user
    const getUserBookshelves = async (req, res) => {
        const userId = req.params.userId;
        const shelves = await shelfDao.findShelvesByUser(userId);
        res.json(shelves);
    };

    const getUserBookshelvesWithBooks = async (req, res) => {
        const userId = req.params.userId;

        const shelves = await shelfDao.findShelvesByUser(userId);

        const result = await Promise.all(
            shelves.map(async (shelf) => {
                const book = await booksDao.findSingleBookById(shelf.bookId);
                return {
                    shelf: shelf.shelf,       // the string: "read", "want", or "reading"
                    createdAt: shelf.createdAt,
                    updatedAt: shelf.updatedAt,
                    dateFinished: shelf.dateFinished,
                    book: book
                };
            })
        );

        res.json(result);
    };

    const removeShelfEntry = async (req, res) => {
        const {userId, bookId} = req.body;
        const deleted = await shelfDao.deleteShelfEntry(userId, bookId);
    };

    const findRecentShelf = async (req, res) => {
        const shelf = await shelfDao.findRecentShelf();
        res.json(shelf);
    }

    const findRecentShelfUser = async (req, res) => {
        const userId = req.query.userId;
        const shelf = await shelfDao.findRecentShelfUser(userId);
        res.json(shelf);
    }

    app.get("/api/bookshelf/user/recent", findRecentShelfUser);
    app.get("/api/bookshelf/recent", findRecentShelf);
    app.get("/api/bookshelf", getAllBookshelves);
    app.delete("/api/bookshelf", removeShelfEntry);
    app.post("/api/bookshelf", createBookshelf);
    app.get("/api/bookshelf/user/:userId", getUserBookshelvesWithBooks);

}