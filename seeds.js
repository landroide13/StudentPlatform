const Author = require('./models/author');
const Type = require('./models/type');
const Category = require('./models/category');
const Role = require('./models/role');

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/testDB1')
        .then(() => {
            console.log("Connection Open")
        })
        .catch(err => console.log(err))

const categories = [
    {name: 'Art'},
    {name: 'Mathematics'},
    {name: 'Technology'},
]


const authors = [
    {name: 'Claude Monet', nationality:'French', born: '1840', died:'1926', knownFor:'Painter', notableWork:'Water Lilies'},
    {name: 'Steve Jobs', nationality:'EEUU', born: '1969', died:'2011', knownFor:'Apple', notableWork:'Apple Corp.'}
]

const types = [
    {name: 'Biography'},
    {name: 'Algorithm'},
    {name: 'Theorem'},
    {name: 'Programming'},
    {name: 'Painting'},
]

const roles = [
    {name: 'Admin'},
    {name: 'Tutor'},
]


//a.save().then(data => console.log(data))
//const a = new Author({name: 'Claude Monet', nationality:'French', born: '1840', died:'1926', knownFor:'Painter', notableWork:'Water Lilies'})


//Uncomment thi last lines to generate and populate DB(-> node seed.js)
//////////////////////////////////////////
//Type.insertMany(types).then(res =>  console.log(res))
//Role.insertMany(roles).then(res =>  console.log(res))
//Author.insertMany(authors).then(res =>  console.log(res))
//Category.insertMany(categories).then(res =>  console.log(res))





