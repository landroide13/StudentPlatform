const Article = require('../models/article');

exports.getArticles = (req, res) => {
    const articles = Article.find().populate('category').populate('type').populate('author');
    articles.then(data => res.json(data))
    .catch(err => res.send(err))
}

exports.getArticle = (req, res) => {
    const { id } = req.params;
    const article = Article.findById(id).populate('category').populate('type').populate('author');
    article.then(data => res.json(data))
    .catch(err => console.log(err))
}

module.exports = exports;






