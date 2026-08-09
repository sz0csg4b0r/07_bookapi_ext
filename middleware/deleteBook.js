module.exports = (objRep) => {
    const { bookModel, db } = objRep;
    return (req, res, next) => {
        //const deleteBookById = books[res.locals.bookId];
        const deletedBook = res.locals.book;
        //books.splice(res.locals.bookId, 1);
        bookModel.remove(deletedBook);
        db.saveDatabase(err => {
            //err
            res.locals.book = deletedBook;
            return next();
            //return res.json({ deletedBook })
        })
    }
}


