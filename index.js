const express = require('express');
const app = express();
const path = require('path');
const methodoverride = require('method-override');

const bcrypt = require('bcrypt');
const session = require('express-session');
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
app.use(session({secret: 'secret', resave: false, saveUninitialized: false}));
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true}));
app.use(methodoverride('_method'));

//Middleware
app.use((req, res, next) => {
    res.locals.currentUser = req.session.profile_id;
    next();
})

const requiredLogin = (req, res, next) =>{
    if(!req.session.profile_id){
        return res.redirect('/');
     }
     next();
}

//Get Home
app.get('/', async(req, res) => {
    res.render('home');
})

/////////////////////////////////
//Articles Routes
////////////////////////////////
//Get Articles
app.get('/articles',requiredLogin ,async(req, res) => {
    const articles = await Article.find();
    const userID = req.session.profile_id;
    res.render('articles/index', { articles, userID });
})

//Create Article by Profile
app.get('/profiles/:id/articles/new', async(req, res) => {
    const { id } = req.params;
    const profile = await Profile.findById(id);
    const categories = await Category.find();
    res.render('articles/new', { categories, profile })
});

app.post('/profiles/:id/articles', async(req, res) => {
    const { id } = req.params;
    const profile = await Profile.findById(id);
    const { name , text, category, author } = req.body;
    const article = new Article({ name , text, author, category});
    profile.articles.push(article);
    article.author = profile;
    await profile.save();
    await article.save();
    res.redirect(`/profiles/${id}`);
});

//Edit Article
app.get('/articles/:id/edit', async(req, res) =>{
    const { id } = req.params;
    const article = await Article.findById(id).populate('author');
    const categories = await Category.find();
    res.render('articles/edit', { article, categories });
})

app.put('/articles/:id', async(req, res) => {
    const { id } = req.params;
    const article = await Article.findByIdAndUpdate(id, req.body, {runValidators: true, new: true})
    const author = article.author;
    res.redirect(`/profiles/${author}`)
})

//Get Article
app.get('/articles/:id/show', async(req, res) =>{
    const { id } = req.params;
    const article = await Article.findById(id).populate('author');
    res.render(`articles/show`, { article });
})


//Delete Article
app.delete('/articles/:id', async(req, res) => {
    const { id } = req.params;
    const article = await Article.findByIdAndDelete(id);
    const author = article.author;
    res.redirect(`/profiles/${author}`);
})

/////////////////////////////////////
//Profile
////////////////////////////////////
//Register Profile
app.get('/profiles/register', (req, res) =>{
    res.render('profiles/register');
})

app.post('/profiles/register', async(req, res) =>{
    const { name, password, email } = req.body;
    const profile = new Profile({ name, password, email });
    await profile.save();
    req.session.profile_id = profile._id;
    res.redirect('/articles');
})

//Login Profile
app.get('/profiles/login', (req, res) => {
    res.render('profiles/login')
})

app.post('/profiles/login', async(req, res) => {
    const { name, password} = req.body;
    const foundUser = await Profile.findAndValidate(name, password);
    if(foundUser){
        req.session.profile_id = foundUser._id;
        res.redirect('/articles');    
    }else{
        res.redirect('/profiles/login');
    }
})

//Logout
app.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
})


//Get Profile
app.get('/profiles/:id', async(req, res) => {
    const { id } = req.params;
    const profile = await Profile.findById(id).populate('articles');
    res.render('profiles/show', { profile });
})


//Students
///////////////////////////////////
//Get all articles





//Server Runner........
app.listen(8080, ()=> {
    console.log('App running at 8080')
});


