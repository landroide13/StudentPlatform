const Author = require('../models/author');

exports.getAuthors = (req, res) => {
    const authors = Author.find().populate('articles')
    authors.then(data => res.json(data))
    .catch(err => res.send(err))
}

exports.getAuthor = (req, res) => {
    const { id } = req.params;
    const author = Author.findById(id).populate('articles')
    author.then(data => res.json(data))
    .catch(err => console.log(err))
}

module.exports = exports;
