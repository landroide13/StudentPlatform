const mongoose = require('mongoose');
const { Schema } = require('mongoose');
const bcrypt = require('bcrypt');

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
    role: {
        type: Schema.Types.ObjectId,
        ref: 'Role'
    },
    articles: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Article'   
        }
    ]
})

profileSchema.statics.findAndValidate = async function(email, password){
    const foundUser = await this.findOne({ email });
    const isValid = await bcrypt.compare(password, foundUser.password);
    return isValid ? foundUser : false;
}

profileSchema.pre('save', async function(next){
    if(!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 12);
})

const Profile = mongoose.model('Profile', profileSchema)

module.exports = Profile;