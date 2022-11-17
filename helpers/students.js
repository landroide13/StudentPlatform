const Student = require('../models/student');

exports.registerStudent = (req, res) => {
    Student.create(req.body).then(todo => res.status(201).json(todo))
    .catch(err => console.log(err))
    res.send('Sign Up')
}

exports.loginStudent = (req, res) => {
    
}






module.exports = exports;







