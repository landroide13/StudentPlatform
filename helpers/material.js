const Article = require('../models/article');



exports.getArticles = (req, res) => {
    const articles = Article.find();
    articles.then(data => res.json(data))
    .catch(err => res.send(err))
}

exports.getArticle = (req, res) => {
    const { id } = req.params;
    const article = Article.findById(id);
    article.then(data => res.json(data))
    .catch(err => console.log(err))
}

module.exports = exports;






