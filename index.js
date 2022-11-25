const express = require('express');
const app = express();
const path = require('path');
const methodoverride = require('method-override');

const bcrypt = require('bcrypt');
const session = require('express-session');
const flash = require('connect-flash');
const mongoose = require('mongoose');
const body = require('body-parser');

//DBs
const db1 = 'StudentMaterialDB';
const testDB1 = 'testDB1';
const material = 'StudentPlatform1';

//Models
const Category = require('./models/category')
const Role = require('./models/role');
const Profile = require('./models/profile');
const Student = require('./models/student');
const Article = require('./models/article');
const Type = require('./models/type');
const Author = require('./models/author');

//Api Routes
const materialRoutes = require('./routes/material');
app.use('/api/articles', materialRoutes);

const categoryRoutes = require('./routes/category');
app.use('/api/categories', categoryRoutes);

const authorRoutes = require('./routes/author');
app.use('/api/authors', authorRoutes);

//Connection
mongoose.connect(`mongodb://localhost:27017/${material}`)
        .then(() => {
            console.log("Connection Open")
        })
        .catch(err => console.log(err))

//Uses        
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, '/public')));
app.use(session({secret: 'secret', resave: false, saveUninitialized: false, cookie: { maxAge: 1600000 }}));
app.use(flash());
app.set('view engine', 'ejs');

app.use(body.json());
app.use(body.urlencoded({extended: true}))

app.use(express.urlencoded({extended: true}));
app.use(methodoverride('_method'));

///////////////////////
//Middleware
//////////////////////

app.use((req, res, next) => {
    res.locals.currentUser = req.session.profile_id;
    res.locals.userName = req.body.name;
    next();
})

const requiredLogin = (req, res, next) =>{
    if(!req.session.profile_id){
        return res.redirect('/');
     }
     next();
}

app.use((req, res, next) => {
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})

//Get Home
app.get('/', async(req, res) => {
    res.render('home');
})

/////////////////////////////////
//Articles Routes
////////////////////////////////

//Get Articles
app.get('/articles',requiredLogin ,async(req, res) => {
    const articles = await Article.find().populate('category').populate('author').populate('type');
    const id = req.session.profile_id;
    const profile = await Profile.findById(id).populate('role');
    const categories = await Category.find();
    res.render('articles/index', { articles, categories, profile });
})

//Get Article
app.get('/articles/:id/show',requiredLogin, async(req, res) =>{
    const { id } = req.params;
    const article = await Article.findById(id).populate('author').populate('category').populate('type');
    res.render(`articles/show`, { article });
})

//Create Article by Profile
app.get('/profiles/:id/articles/new',requiredLogin, async(req, res) => {
    const { id } = req.params;
    const profile = await Profile.findById(id);
    const categories = await Category.find();
    const types = await Type.find();
    const authors = await Author.find();
    res.render('articles/new', { categories, profile, types, authors })
});

app.post('/profiles/:id/articles', async(req, res) => {
    const { id } = req.params;
    const profile = await Profile.findById(id);
    const { name , text, category, author } = req.body;
    const authorA = await Author.findById(author)
    const article = new Article({ name , text, author, category});
    authorA.articles.push(article)
    await article.save();
    await authorA.save();
    req.flash('success', 'Successfully Created');
    res.redirect(`/articles`);
});

//Edit Article
app.get('/articles/:id/edit',requiredLogin, async(req, res) =>{
    const { id } = req.params;
    const article = await Article.findById(id).populate('category');
    const categories = await Category.find();
    const authors = await Author.find();
    const types = await Type.find();
    res.render('articles/edit', { article, categories, authors, types });
})

app.put('/articles/:id', requiredLogin, async(req, res) => {
    const { id } = req.params;
    const article = await Article.findByIdAndUpdate(id, req.body, {runValidators: true, new: true})
    const author = article.author;
    req.flash('success', 'Successfully Updated..');
    res.redirect(`/articles`);
})



//Delete Article
app.delete('/articles/:id', async(req, res) => {
    const { id } = req.params;
    console.log("article " + id);
    const article = await Article.findByIdAndDelete(id);
    req.flash('success', 'Successfully Deleted..');
    res.redirect(`/articles`);
})


/////////////////////////////////////
//Profile
////////////////////////////////////

//Register Profile
app.get('/profiles/register', async(req, res) =>{
    const profileRoles = await Role.find();
    res.render('profiles/register', { profileRoles });
})

app.post('/profiles/register', async(req, res) =>{
    const { name, password, email, role } = req.body;
    const profile = new Profile({ name, password, email, role });
    await profile.save();
    req.session.profile_id = profile._id;
    req.flash('success', 'Successfully Registered..');
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
        req.flash('success', 'Successfully Logged in..');
        res.redirect('/articles');    
    }else{
        req.flash('error', 'Sorry, try again..')
        res.redirect('/profiles/login');
    }
})

//Logout
app.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
})

//Show Profile
app.get('/profiles/:id', async(req, res) => {
    const { id } = req.params;
    const profile = await Profile.findById(id).populate('role')
    res.render('profiles/show', { profile });
})

///////////////////////////////////
//Students
///////////////////////////////////
//Get all Students
app.get('/students',requiredLogin, async(req, res) => {
    const students = await Student.find();
    res.render('students', { students });
})

//Delete Student
app.delete('/students/:id', async(req, res) => {
    const { id } = req.params;
    console.log("student " + id);
    const student = await Student.findByIdAndDelete(id);
    req.flash('success', 'Successfully Deleted..')
    res.redirect(`/students`);
})


///////////////////
// Authors
//////////////////

// Create Authors
app.get('/profiles/:id/authors/new', requiredLogin, async(req, res) => {
    const { id } = req.params;
    const profile = await Profile.findById(id);
    const categories = await Category.find();
    const types = await Type.find();
    const authors = await Author.find();
    res.render('authors/new', { categories, profile, types, authors })
});

app.post('/profiles/:id/authors', async(req, res) => {
    const { id } = req.params;
    const profile = await Profile.findById(id);
    const { name , nationality, born, died, work } = req.body;
    const author = new Author({ name ,  nationality, born, died, work, profile });
    await author.save();
    req.flash('success', 'Successfully Created');
    res.redirect(`/articles`);
});

//Get Authors
app.get('/authors',requiredLogin ,async(req, res) => {
    const authors = await Author.find();
    const id = req.session.profile_id;
    const profile = await Profile.findById(id).populate('role');
    const categories = await Category.find();
    res.render('authors/index', { authors, categories, profile });
})

//Get Author
app.get('/authors/:id/show', async(req, res) =>{
    const { id } = req.params;
    const idp = req.session.profile_id;
    const profile = await Profile.findById(idp).populate('role');
    const author = await Author.findById(id).populate('articles');
    res.render(`authors/show`, { author, profile });
})

// Update Author
app.get('/authors/:id/edit', requiredLogin, async(req, res) =>{
    const { id } = req.params;
    const author = await Author.findById(id).populate('articles');
    res.render('authors/edit', { author });
})

app.put('/authors/:id', async(req, res) => {
    const { id } = req.params;
    const article = await Author.findByIdAndUpdate(id, req.body, {runValidators: true, new: true})
    req.flash('success', 'Successfully Updated..');
    res.redirect(`/authors`);
})

//Delete Author
app.delete('/authors/:id', async(req, res) => {
    const { id } = req.params;
    const author = await Author.findByIdAndDelete(id);
    req.flash('success', 'Successfully Deleted..');
    res.redirect(`/authors`);
})


////////////////////////
//Server Runner........
app.listen(8080, ()=> {
    console.log('App running at 8080')
});


