import BooksDao from "./dao.js";

export default function BooksRoutes(app, db) {
    const dao = BooksDao(db);

    // GET all books
    const getAllBooks = (req, res) => {
        const books = dao.findAllBooks();
        res.json(books);
    };

    // GET book by ID
    const getBookById = (req, res) => {
        const bookId = req.params.bookId;
        const book = dao.findBookById(bookId);
        if (book) {
            res.json(book);
        } else {
            res.status(404).json({ error: "Book not found" });
        }
    };

    // GET books by author
    const getBooksByAuthor = (req, res) => {
        const authorId = req.params.authorId;
        const books = dao.findBooksByAuthor(authorId);
        res.json(books);
    };

    // POST create a new book
    const createBook = (req, res) => {
        const book = dao.createBook(req.body);
        res.status(201).json(book);
    };

    // PUT update a book
    const updateBook = (req, res) => {
        const bookId = req.params.bookId;
        const updates = req.body;
        dao.updateBook(bookId, updates);
        res.sendStatus(204);
    };

    // DELETE a book
    const deleteBook = (req, res) => {
        const bookId = req.params.bookId;
        dao.deleteBook(bookId);
        res.sendStatus(204);
    };

    app.get("/api/books", getAllBooks);
    app.get("/api/books/:bookId", getBookById);
    app.get("/api/books/author/:authorId", getBooksByAuthor);
    app.post("/api/books", createBook);
    app.put("/api/books/:bookId", updateBook);
    app.delete("/api/books/:bookId", deleteBook);
}