// Packages
const _ = require('lodash');
const { ObjectID } = require('mongodb');

// Custom modules
const { Car } = require('./../models/car');
const { Category } = require('./../models/category');
const { validateCar } = require('./../utils/validator');

exports.getCars = (req, res) => {
    Car.find()
        .then((car) => {
            res.send(car);
        }).catch((err) => {
            res.status(400);
        });
}

exports.postCar = (req, res) => {
    const body = _.pick(req.body, ["name", "numberInStock", "dailyRentalRate", "categoryId", "details"]);

    const { error } = validateCar(body);

    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    Category.findOne({ _id: body.categoryId })
        .then((category) => {
            if (!category) {
                return res.status(400).send("category does not exist");
            }
            const car = new Car({
                name: body.name,
                numberInStock: body.numberInStock,
                dailyRentalRate: body.dailyRentalRate,
                category: {
                    _id: category._id,
                    name: category.name
                },
                details: body.details
            });

            return car.save();
        }).then((car) => {
            res.status(201).send(car);
        }).catch((err) => {
            res.status(400);            
        });
    
}

