const express = require('express');
const app = express();
const path = require('path');
const methodoverride = require('method-override');
const mongoose = require('mongoose');

//DBs
const db1 = 'StudentMaterialDB';
const testDB1 = 'testDB1';

//Models
const Category = require('./models/category')
const Role = require('./models/role');
const Profile = require('./models/profile');
const Student = require('./models/student');
const Article = require('./models/article');

//Connection
mongoose.connect(`mongodb://localhost:27017/${testDB1}`)
        .then(() => {
            console.log("Connection Open")
        })
        .catch(err => console.log(err))

app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, '/public')));

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true}));
app.use(methodoverride('_method'));

//Articles Routes

//Get Articles
app.get('/profiles', async(req, res) => {
    const articles = await Article.find();
    res.render('profile/index', { articles });
})

//Create Article by ID
app.get('/profiles/:id/articles/new', async(req, res) => {
    const { id } = req.params;
    const profile = await Profile.findById(id);
    const categories = await Category.find();
    res.render('articles/new', { categories, profile })
});

app.post('/profiles/:id/articles', async(req, res) => {
    const { id } = req.params;
    const profile = await Profile.findById(id);
    const article = new Article(req.body);
    profile.articles.push(article);
    article.author = profile;
    await profile.save();
    await article.save();
    res.redirect(`/profiles/${id}`);
});

//Profile 
//Get Profile
app.get('/profiles/:id', async(req, res) => {
    const articles = await Article.find();
    res.render('profile/show', { articles });
})



//Students

//Get students
app.get('/students', async(req, res) => {
    const articles = await Article.find();
    res.render('students/index', { articles });
})




//Server Runner........
app.listen(8080, ()=> {
    console.log('App running at 8080')
});


