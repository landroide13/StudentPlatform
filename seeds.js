const Author = require('./models/author');
const Type = require('./models/type');
const Category = require('./models/category');
const Role = require('./models/role');

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/StudentPlatform1')
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
    {name: 'Claude Monet', nationality:'French', born: '1840', died:'1926', knownFor:'Paint', notableWork:'Water Lilies'},
    {name: 'Steve Jobs', nationality:'EEUU', born: '1969', died:'2011', knownFor:'Apple', notableWork:'Apple Corp.'},
    {name: 'Leonardo Davinci', nationality:'Italy', born: '1493', died:'1560', knownFor:'Artist', notableWork:'Mona Lisa'},
    {name: 'Pitagoras', nationality:'Grece', born: '370', died:'450', knownFor:'Geometry', notableWork:'The Teorem'},
    {name: 'Euclids', nationality:'Egipt', born: '385', died:'420', knownFor:'Euclidian Geometry', notableWork:'Theorems'},
    {name: 'James Gosling', nationality:'EEUU', born: '1963', died:'', knownFor:'Programming', notableWork:'Java'},
    {name: 'Bill Gates', nationality:'EEUU', born: '1955', died:'', knownFor:'Entreprenour', notableWork:'Microsoft'},
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
/*
Type.insertMany(types).then(res =>  console.log(res))
Role.insertMany(roles).then(res =>  console.log(res))
Author.insertMany(authors).then(res =>  console.log(res))
Category.insertMany(categories).then(res =>  console.log(res))
*/




