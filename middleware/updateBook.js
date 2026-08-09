module.exports = (objRep) => {
    //const { books } = objRep;
    const { bookModel, db } = objRep;
    return (req, res, next) => {
        if (typeof req.body.title !== 'undefined') {
            res.locals.book.title = req.body.title;
        }
        if (typeof req.body.author !== 'undefined') {
            res.locals.book.author = req.body.author;
        }
        if ((typeof req.body.author === 'undefined') && (typeof req.body.title === 'undefined')) {
            return res.status(400).json({ error: 'Missing title or author' })
        }

        bookModel.update(res.locals.book);
        db.saveDatabase(err => {
            return next();
        })
    }
}

