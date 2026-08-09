module.exports = (objRep) => {
    const { bookModel } = objRep;
    return (req, res, next) => {
        res.locals.books = bookModel.find();
        return next();
        //const allBooks = bookModel.find();
        console.table(allBooks);
        //return res.json(res.locals.books);
        
    }
}