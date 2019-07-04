// Packages
const mongoose = require('mongoose');


exports.Customer = mongoose.model('Customer', {
    name: {
        type: String,
        required: true,
        minlength: 4,
        maxlength: 50,
        trim: true
    },
    phone: {
        type: String,
        required: true,
        minlength: 10,
        trim: true
    }
});