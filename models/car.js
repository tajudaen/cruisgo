// Packages
const mongoose = require('mongoose');


//custom module
const { categorySchema } = require('./category');

exports.Car = mongoose.model('Car', {
    name: {
        type: String,
        required: true,
        minlength: 4,
        maxlength: 200,
        trim: true
    },
    numberInStock: {
        type: Number,
        required: true,
        min: 0,
        max: 200
    },
    dailyRentalRate: {
        type: Number,
        required: true,
        min: 0,
        max: 200
    },
    category: {
        type: categorySchema,
        required: true
    },
    details: {
        brand: {
            type: String,
            required: true
        },
        model: {
            type: String,
            required: true
        },
        color: {
            type: String,
            required: true
        }
    }
});