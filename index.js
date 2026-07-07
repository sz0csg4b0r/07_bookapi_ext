const express = require('express')
const bodyParser = require('body-parser')

const app = express()

// parse application/json
app.use(bodyParser.json())
//app.use(bodyParser.json()) claude azt mondja hogy ez már elavult - helyett express.json.. nem bodyparser

let globalId = 3;
const books = [
    {
        id: 1,
        title: '1es',
        author: 'Loremipsum'
    },
    {
        id: 2,
        title: '2es',
        author: '2Loremipsum'
    }
];

const getBooks = (req, res, next) => {
    console.table(books);
    return res.json(books);

}

const getBookIndex = (req, res, next) => {
    const bookIdAsNumber = parseInt(req.params.id, 10);
    let foundId = -1;
    for (let i = 0; i < books.length; i++) {
        if (books[i].id === bookIdAsNumber) {
            foundId = i;
            break;
        }
    }
    //Ha nincs akkor 404 üzenet.
    if (foundId === -1) {
        return res.status(404).json({ error: `Book not found with id: ${req.params.id}` });
    }
    res.locals.bookId = foundId;
    return next();
}

const createBook = (req, res, next) => {
    if (typeof req.body.title == 'undefined' || typeof req.body.author == 'undefined') {
        //error
        return res.status(400).json({ error: 'Missing title or author' })
    }
    const newBook = {
        id: globalId,
        title: req.body.title,
        author: req.body.author
    }
    books.push(newBook);
    globalId++;
    return res.json(newBook)
}

const deleteBook = (req, res, next) => {
    const deleteBookById = books[res.locals.bookId];
    books.splice(res.locals.bookId, 1);
    return res.json({ deleteBookById })
}

const updateBook = (req, res, next) => {
    if (typeof req.body.title !== 'undefined') {
        books[res.locals.bookId].title = req.body.title;
    }

    if (typeof req.body.author !== 'undefined') {
        books[res.locals.bookId].author = req.body.author;

    }

    if ((typeof req.body.author === 'undefined') && (typeof req.body.title === 'undefined')) {
        return res.status(400).json({ error: 'Missing title or author' })
    }


    //TODO: itt most nincs hibaüzenet, ha nem írsz be semmit visszaadja az eredeti objectet. Lehet finomítani egy hibaüzenettel.   
    return res.json(books[res.locals.bookId]);

}
const search = (req, res, next) => {
    if (typeof req.body.search == 'undefined') {
        return res.status(400).json({ error: 'Missing search' })
    }
    const s = req.body.search;
    //Filter!!! vidó 35 perc
    return res.json(books.filter(e => e.title.includes(s) || e.author.includes(s)));
}

app.get('/book', getBooks); // Minden könyv
//Egy adott könyv indexe, plusz kiegészítéssel:  //Itt kiegészült egy mw-rel: mert fél sor, ezért került ide a második függvény... Video 33.percnél! 
app.get('/book/:id', getBookIndex, (req, res, next) => res.json(books[res.locals.bookId]));
app.put('/book', createBook);
app.delete('/book/:id', getBookIndex, deleteBook);
app.patch('/book/:id', getBookIndex, updateBook);
app.post('/search/', search);

app.use(function (req, res) {
    res.setHeader('Content-Type', 'text/plain')
    res.write('you posted:\n')
    res.end(String(JSON.stringify(req.body, null, 2)));
})

var server = app.listen(6000, function () {
    console.log('Server running on :6000');
});