// Packages
const mongoose = require('mongoose');
const validator = require("validator");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        trim: true
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        trim: true,
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: '{VALUE} is not a valid email'
        }
    },
    password: {
        type: String,
        require: true,
        minlength: 6,
        trim: true
    },
    role: {
        type: String,
        require: true
    }
});

userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id, role: this.role }, process.env.JWT_SECRET);
    return token;
}

userSchema.pre('save', function (next) {
    const user = this;
    
    bcrypt.genSalt(parseInt(process.env.SALT_ROUND), (err, salt) => {
        bcrypt.hash(user.password, salt, (err, hash) => {
            user.password = hash;
            next();
        });
    });
});

exports.User = mongoose.model('User', userSchema);
