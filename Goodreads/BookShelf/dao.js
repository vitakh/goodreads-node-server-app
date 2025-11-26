import { v4 as uuidv4 } from "uuid";
import model from "./model.js";
export default function BooksShelfDao() {
    const createShelfEntry = (entry) => {
        const newShelf = { ...entry, _id: uuidv4() };
        return model.create(newShelf);
    };
    const findAllShelves = () => model.find();
    const findShelvesByUser = (userId) => {
        return model.find({userId: userId})
    };
    const findShelvesByBook = (bookId) => { /* ... */ };
    const updateShelfEntry = (entryId, updates) => { /* ... */ };
    const deleteShelfEntry = (userId, bookId) => {
        return model.findOneAndDelete({userId, bookId});
    };

    return {
        createShelfEntry,
        findAllShelves,
        findShelvesByUser,
        findShelvesByBook,
        updateShelfEntry,
        deleteShelfEntry
    };
}