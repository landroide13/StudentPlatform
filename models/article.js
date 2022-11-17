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
        ref: 'Author',
        default: 'Unknown'
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category'
    },
    type: {
        type: Schema.Types.ObjectId,
        ref: 'Type'
    },
    year:{
        type: String,
    },
    medium:{
        type: String,
    },
    location:{
        type: String,
    },
    developer:{
        type: String,
    },
    designBy:{
        type: String,
    }
})



const Article = mongoose.model('Article', articleSchema)

module.exports = Article;