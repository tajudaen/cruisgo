// Packages
const mongoose = require('mongoose');
const _ = require('lodash');
const Fawn = require('fawn');

Fawn.init(mongoose);

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

exports.postRental = (req, res) => {
    const body = _.pick(req.body, ["customerId", "carId"]);

    const { error } = validateRental(body);
    if (error) {
        const payLoad = [];
        error.details.forEach(err => {
            payLoad.push(err.message);
        });

        return res.status(400).send(payLoad);
    }

    let customer;
    let rental
    
    Customer.findOne({_id: body.customerId})
        .then((result) => {
            if (!result) {
                return res.status(400).send('Customer not found');
            }
            customer = result;
            return Car.findOne({_id: body.carId});
        })
        .then((car) => {
            if (!car) {
                return res.status(400).send('Car not found');
            }

            if (car.numberInStock === 0) {
                return res.status(400).send('Car not in stock.');
            }

            rental = new Rental({
                customer: {
                    _id: customer._id,
                    name: customer.name,
                    phone: customer.phone
                },
                car: {
                    _id: car._id,
                    name: car.name,
                    dailyRentalRate: car.dailyRentalRate
                }
            });

            return new Fawn.Task()
                .save('rentals', rental)
                .update('cars', { _id: car._id }, {
                    $inc: { numberInStock: -1 }
                })
                .run();
        })
        .then((result) => {
            res.send(rental);
        }).catch((err) => {
            res.status(500);
        });
};

exports.returns = (req, res) => {
    const body = _.pick(req.body, ["customerId", "carId"]);

    const { error } = validateRental(body);
    if (error) {
        const payLoad = [];
        error.details.forEach(err => {
            payLoad.push(err.message);
        });

        return res.status(400).send(payLoad);
    }

    let updatedRecord;

    Rental.findOne({'customer._id': body.customerId, 'car._id': body.carId})
        .then((rental) => {
            if (!rental) {
                return res.status(404).send('No record found');
            }    

            if (rental.dateReturned) {
                return res.status(400).send();
            }

            rental.return();
            
            return rental.save();
        }).then(result => {
            updatedRecord = result;
            const carId = result.car._id.toHexString();

            return Car.findOneAndUpdate({_id: carId }, {$inc: {numberInStock: 1}}, {new: true});
        }).then((result) => {
            res.send(updatedRecord);
        }).catch((err) => {
            res.status(400).send();
        });
}