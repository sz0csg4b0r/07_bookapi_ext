module.exports = (objRep, templateFile) => {
    return (req, res, next) => {
        res.render(templateFile, res.locals);
    }
}
//middleware