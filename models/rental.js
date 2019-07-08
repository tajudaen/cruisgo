// Packages
const mongoose = require('mongoose');
const moment = require('moment');

const rentalSchema = new mongoose.Schema({
    customer: {
        type: new mongoose.Schema({
            name: {
                type: String,
                required: true,
                minlength: 4,
                maxlength: 50
            },
            phone: {
                type: String,
                required: true,
                minlength: 10
            }
        }),
        required: true
    },
    car: {
        type: new mongoose.Schema({
            name: {
                type: String,
                required: true,
                minlength: 3,
                maxlength: 200,
                trim: true
            },
            dailyRentalRate: {
                type: Number,
                required: true,
                min: 0,
                max: 200
            }
        }),
        required: true
    },
    dateOut: {
        type: Date,
        required: true,
        default: Date.now
    },
    dateReturned: {
        type: Date
    },
    rentalFee: {
        type: Number,
        min: 0
    }
});

rentalSchema.methods.return = function () {
    const rental = this;
    rental.dateReturned = new Date();

    const rentalDuration = moment().diff(rental.dateOut, 'days');
    rental.rentalFee = rentalDuration * rental.car.dailyRentalRate;
}

const Rental = mongoose.model('Rental', rentalSchema);

module.exports = {
    Rental
}