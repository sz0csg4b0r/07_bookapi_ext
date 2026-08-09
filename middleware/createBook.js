//const uuid = require('uuid');

module.exports = (objRep) => {
    const { bookModel, db, uuid } = objRep;
    //const { books, globalId } = objRep; // ez volt a korábbi verzió loki előtt...
    return (req, res, next) => {
        if (typeof req.body.title == 'undefined' || typeof req.body.author == 'undefined') {
            //error
            return res.status(400).json({ error: 'Missing title or author' })
        }
        const newBook = {
            //id: globalId, //kell unique id...   // itt kell installálni az uuid package-t! 
            id: uuid.v4(),
            title: req.body.title,
            author: req.body.author
        }
               bookModel.insert(newBook);
        return db.saveDatabase((err) => {
            return next();
        })
    }
}


