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

//Query Middleware
/*
articleSchema.post('findOneAndDelete', async function(article){
    if(artilce.products.length){
       const res = await Product.deleteMany({ _id: {$in: farm.products } })
       console.log(res);
    }
    }
)
*/


const Article = mongoose.model('Article', articleSchema)

module.exports = Article;