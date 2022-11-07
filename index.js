const express = require('express');
const app = express();
const path = require('path');
const methodoverride = require('method-override');
const mongoose = require('mongoose');

//DBs
const db1 = 'StudentMaterialDB';
const testDB1 = 'testDB1';

//Conection
mongoose.connect(`mongodb://localhost:27017/${testDB1}`)
        .then(() => {
            console.log("Connection Open")
        })
        .catch(err => console.log(err))

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true}))
app.use(methodoverride('_method'))

//Profile 






//Runner
app.listen(8080, ()=> {
    console.log('App running at 8080')
})


