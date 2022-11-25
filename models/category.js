const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    onArticle:[
     {
        type: Schema.Types.ObjectId,
        ref: 'Article'
    }
    ]
})

const Category = mongoose.model('Category', categorySchema)

module.exports = Category;