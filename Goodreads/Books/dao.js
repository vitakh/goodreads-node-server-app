import model from "./model.js";
export default function BooksDao() {
    const findAllBooks = () => model.find();

    const findSingleBookById = (bookId) => model.findById(bookId);

    const createBook = (book) => {
        const newBook = { ...book};
        return model.create(newBook);
    };

    const updateBook = (bookId, updates) => {
        model.updateOne({ _id: bookId }, { $set: updates })

    };

    const deleteBook = (bookId) => {
        model.findByIdAndDelete( bookId )
    };

    return {
        findAllBooks,
        findSingleBookById,
        createBook,
        updateBook,
        deleteBook,
    };
}