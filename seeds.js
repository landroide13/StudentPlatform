const Author = require('./models/author');
const Type = require('./models/type');

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/testDB1')
        .then(() => {
            console.log("Connection Open")
        })
        .catch(err => console.log(err))

const Articles = [
    {name: 'Green Grapes', price: 5.6, category: 'fruits'},
    {name: 'Bananas', price: 6, category: 'fruits'},
    {name: 'Celery', price: 5.4, category: 'veggies'}
]


const authors = [
    {name: 'Claude Monet', nationality:'French', born: '1840', died:'1926', knownFor:'Painter', notableWork:'Water Lilies'},
    
]

const types = [
    {name: 'Biography'},
    {name: 'Algorithm'},
    {name: 'Theorem'},
    {name: 'Programming'},
    {name: 'Painting'},
]

/*
const p = new Product({name: 'Ruby Grapes', price: 50, category: 'fruits'})

p.save().then(data => console.log(data))
*/


//const a = new Author({name: 'Claude Monet', nationality:'French', born: '1840', died:'1926', knownFor:'Painter', notableWork:'Water Lilies'})

//Type.insertMany(types).then(res =>  console.log(res))

//a.save().then(data => console.log(data))




