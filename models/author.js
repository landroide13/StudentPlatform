const mongoose = require('mongoose');
const { Schema } = require('mongoose');
const bcrypt = require('bcrypt');

const authorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    nationality: {
        type: String
    },
    born: {
        type: String,
    },
    died: {
        type: String,
    },
    articles: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Article'   
        }
    ],
    knownfor:{
        type: String
    },
    notableWork:{
        type: String
    }
})

const Author = mongoose.model('Author', authorSchema)

module.exports = Author;







