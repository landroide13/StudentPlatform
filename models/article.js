const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const articleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'Profile'
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category'
    }
})


const Article = mongoose.model('Article', articleSchema)

module.exports = Article;