const config = require('config');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const mongoose = require('mongoose');

// Basic User Schema
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 255
    },
    isAdmin: Boolean,
});

// custom schema method to generate token
UserSchema.methods.generateAuthToken = funtion() {
    // get the private key from the config file -> environment variable
    const token = jwt.sign({ _id: this._id, isAdmin: this.isAdmin }, config.get('myprivatekey'));
    return token;
}

const User = mongoose.model('User', UserSchema);

function validateUser(user) {
    const schema = {
        name: Joi.string().min(3).max(50).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(3).max(255).required()
    }

    Joi.validate(user, schema);
}

exports.User = User;
exports.validate = validateUser;