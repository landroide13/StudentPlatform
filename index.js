const express = require('express');
const app = express();
const path = require('path');
const methodoverride = require('method-override');

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/StudentMaterialDB')
        .then(() => {
            console.log("Connection Open")
        })
        .catch(err => console.log(err))











//Runner
app.listen(8080, ()=> {
    console.log('App running at 8080')
})


