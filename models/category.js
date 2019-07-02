// Packages
const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        trim: true
    }  
});

exports.Category = mongoose.model('Category', categorySchema);

exports.categorySchema = categorySchema;