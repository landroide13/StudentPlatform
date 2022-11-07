const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String
    },
    password: {
        type: String,
        required: true
    }
})

const Student = mongoose.model('Student', studentSchema)

module.exports = Student;




