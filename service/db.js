const loki = require('lokijs');
const db = new loki('library.db'); // db elnevezés

function initDatabase(cb) {
    db.loadDatabase({}, err => {
        if (err) {
            return cb(err);
        }
        let bookModel = db.getCollection("books");
        if (bookModel === null) {
            bookModel = db.addCollection("books");
        }
        //console.log(bookModel);
        db.saveDatabase(err => {
            cb(err, { db, bookModel });
        });

    });
};


module.exports.initDatabase = initDatabase;
