// Packages
const mongoose = require('mongoose');

exports.Category = mongoose.model('category', {
    name: {
        type: String,
        required: true,
        minlength: 3,
        trim: true
    }  
});