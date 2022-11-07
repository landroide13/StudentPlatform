const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const profileSchema = new mongoose.Schema({
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
    },
    role: [{
        type: Schema.Types.ObjectId,
        ref: 'Role'
    }]
})


const Profile = mongoose.model('Profile', profileSchema)

module.exports = Profile;