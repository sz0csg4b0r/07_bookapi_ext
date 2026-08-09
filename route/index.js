const uuid = require('uuid');
const getBooksMW = require('../middleware/getBooks');
const getBookMW = require('../middleware/getBook');
const createBookMW = require('../middleware/createBook');
const deleteBookMW = require('../middleware/deleteBook');
const updateBookMW = require('../middleware/updateBook');
const searchMW = require('../middleware/search');
const renderMW = require('../middleware/render')

function addRoutes(app, db, bookModel) {
    let globalId = 3;
    const objRep = {
        bookModel, db, uuid
    };

    // API endpointok: 
    app.get('/api/book',
        getBooksMW(objRep),
        //renderMW(objRep, "index"));
        (req, res, next) => res.json(res.locals.books)); // Minden könyv   //a renderben az index ejs-t fogja használni, ez a paraméter
    //Egy adott könyv indexe, plusz kiegészítéssel:  //Itt kiegészült egy mw-rel: mert fél sor, ezért került ide a második függvény... Video 33.percnél! 

    app.get('/api/book/:id',
        //getBookMW(objRep), (req, res, next) => res.json(objRep.books[res.locals.book]));
        getBookMW(objRep),
        (req, res, next) => res.json(res.locals.book));

    app.put('/api/book',
        createBookMW(objRep),
        (req, res, next) => res.json(res.locals.book));

    app.delete('/api/book/:id',
        getBookMW(objRep),
        deleteBookMW(objRep),
        (req, res, next) => res.json(res.locals.book));

    app.patch('/api/book/:id',
        getBookMW(objRep),
        updateBookMW(objRep),
        (req, res, next) => res.json(res.locals.book));

    app.post('/api/search/',
        searchMW(objRep));




    //Website SSR elérései
    // Lekérdezés, lista nézet: 
    app.get('/',
        getBooksMW(objRep),
        renderMW(objRep, 'index'));
    
    // Új könyv létrehozása:
    app.get('/newbook',
        renderMW(objRep, 'newbook'));
    
    app.post('/newbook',
        createBookMW(objRep),
        (req, res, next) => res.redirect('/')
    );

    // Meglévő elem módosítása: 
    app.get('/editbook/:id',
        getBookMW(objRep),
        renderMW(objRep, 'newbook'));
    
    app.post('/editbook/:id',
        getBookMW(objRep),
        updateBookMW(objRep),
        (req, res, next) => res.redirect('/')
    );

    // Meglévő elem törlése: 
    app.get('/deletebook/:id',
        getBookMW(objRep),
        deleteBookMW(objRep),
        (req, res, next) => res.redirect('/')
    );

    app.post('/deletebook/:id', (req, res) => {
        res.send('TODO: deletebook post');
    });






}
module.exports = addRoutes;


