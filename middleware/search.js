module.exports = (objRep) => {
    const { bookModel } = objRep;
    return (req, res, next) => {
        if (typeof req.body.search == 'undefined') {
            return res.status(400).json({ error: 'Missing search' })
            console.log('Missing search!' + req.body.search)
        }
        const s = req.body.search;
        const allBooks = bookModel.find();
        
        //Filter!!! vidó 35 perc
        return res.json(allBooks.filter(e => e.title.includes(s) || e.author.includes(s) || e.id.includes(s)));
    }
}

