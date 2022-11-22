const Category = require('../models/category');


exports.getCategories = (req, res) => {
    const categories = Category.find();
    categories.then(data => res.json(data))
    .catch(err => res.send(err))
}

exports.getCategory = (req, res) => {
    const { id } = req.params;
    const category = category.findById(id);
    category.then(data => res.json(data))
    .catch(err => console.log(err))
}


module.exports = exports;