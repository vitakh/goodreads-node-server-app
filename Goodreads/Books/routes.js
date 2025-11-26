import BooksDao from "./dao.js";

export default function BooksRoutes(app) {
    const dao = BooksDao();

    // GET all books
    const getAllBooks = async (req, res) => {
        const books = await dao.findAllBooks();
        res.json(books);
    };

    // GET book by ID
    const getSingleBookById = async (req, res) => {
        const bookId = req.params.bookId;
        const book = await dao.findSingleBookById(bookId);
        if (book) {
            res.json(book);
        } else {
            res.status(404).json({ error: "Book not found" });
        }
    };

    // POST create a new book
    const createBook = async (req, res) => {
        const book = await dao.createBook(req.body);
        res.status(201).json(book);
    };

    // PUT update a book
    const updateBook = async (req, res) => {
        const bookId = req.params.bookId;
        const updates = req.body;
        dao.updateBook(bookId, updates);
        res.sendStatus(204);
    };

    // DELETE a book
    const deleteBook = async (req, res) => {
        const bookId = req.params.bookId;
        dao.deleteBook(bookId);
        res.sendStatus(204);
    };

    app.get("/api/books", getAllBooks);
    app.get("/api/books/details/:bookId", getSingleBookById);
    app.post("/api/books", createBook);
    app.put("/api/books/:bookId", updateBook);
    app.delete("/api/books/:bookId", deleteBook);
}