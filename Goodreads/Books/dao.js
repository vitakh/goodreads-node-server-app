export default function BooksDao(db) {
    let { books } = db;

    const findAllBooks = () => books;

    const findBookById = (bookId) => books.find((book) => book._id === bookId);

    const findBooksByAuthor = (authorId) =>
        books.filter((book) => book.authorId === authorId);

    const createBook = (book) => {
        books = [...books, book];
        db.books = books;
        return book;
    };

    const updateBook = (bookId, updates) => {
        books = books.map((book) =>
            book._id === bookId ? { ...book, ...updates } : book
        );
        db.books = books;
    };

    const deleteBook = (bookId) => {
        books = books.filter((book) => book._id !== bookId);
        db.books = books;
    };

    return {
        findAllBooks,
        findBookById,
        findBooksByAuthor,
        createBook,
        updateBook,
        deleteBook,
    };
}