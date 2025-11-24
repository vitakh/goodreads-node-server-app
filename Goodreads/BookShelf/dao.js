export default function BooksShelfDao(db) {
    let { usershelves } = db;

    const createShelfEntry = (entry) => { /* ... */ };
    const findAllShelves = () => db.usershelves;
    const findShelvesByUser = (userId) => {
        return db.usershelves.filter((entry) => entry.userId == userId);
    };
    const findShelvesByBook = (bookId) => { /* ... */ };
    const updateShelfEntry = (entryId, updates) => { /* ... */ };
    const deleteShelfEntry = (entryId) => { /* ... */ };

    return {
        createShelfEntry,
        findAllShelves,
        findShelvesByUser,
        findShelvesByBook,
        updateShelfEntry,
        deleteShelfEntry
    };
}