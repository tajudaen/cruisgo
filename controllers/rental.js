// Packages
const mongoose = require('mongoose');


// Custom modules
const { validateRental } = require('./../utils/validator');
const { Rental } = require('./../models/rental');
const { Customer } = require('./../models/customer');
const { Car } = require('./../models/car');

exports.getRentals = (req, res) => {
    Rental.find()
        .sort('-dateOut')
        .then((rentals) => {
            res.send(rentals);
        }).catch((err) => {
            res.status(400);
        });
};
