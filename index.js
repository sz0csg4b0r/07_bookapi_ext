const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const { initDatabase } = require('./service/db');
const addRoutes = require('./route');  //indexjs defa

app.use(bodyParser.json())
app.use(bodyParser.urlencoded());

app.set('view engine', 'ejs');

initDatabase((err, { db, bookModel }) => {
    if (err) {
        return console.err(err)
    }

    addRoutes(app, db, bookModel);

    app.listen(6001, function () {
        console.log('Server running on :6001');
    });
});