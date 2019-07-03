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

exports.getCar = (req, res) => {

    const carId = req.params.id;

    if (!ObjectID.isValid(carId)) {
        return res.status(400).send();
    }

    Car.findOne({_id: carId})
        .then((car) => {
            if (!car) {
                return res.status(404).send({ msg: "car not found" });
            }
            res.send(car);
        }).catch((err) => {
            res.status(400);
        });
}

exports.updateCar = (req, res) => {
    const carId = req.params.id;
    const body = _.pick(req.body, ["name", "numberInStock", "dailyRentalRate", "categoryId", "details"]);

    if (!ObjectID.isValid(carId)) {
        return res.status(400).send();
    }
    
    Car.findOne({ _id: carId })
        .then((car) => {
            if (!car) {
                    return res.status(404).send({ msg: "car not found" });
            }

            if ((body.name) && (body.name.length > 3) && (typeof body.name === 'string')) {
                car.name = body.name
            }

            if ((body.dailyRentalRate) && (typeof body.dailyRentalRate === 'number') && (body.dailyRentalRate > 0)) {
                car.dailyRentalRate = body.dailyRentalRate
            }

            if ((body.numberInStock) && (typeof body.numberInStock === 'number') && (body.numberInStock > 0)) {
                car.numberInStock = body.numberInStock
            }

            if ((body.details) && (typeof body.details === 'object')) {
                if ((body.details.brand) && (body.details.brand.length > 3)) {
                    car.details.brand = body.details.brand;
                }

                if ((body.details.color) && (body.details.color > 3)) {
                    car.details.color = body.details.color
                }

                if ((body.details.model) && (body.details.model.length > 3)) {
                    car.details.model = body.details.model
                }
            }

            return Car.findOneAndUpdate({ _id: carId }, {$set: car}, { new: true });

        }).then(updatedCar => {
            res.status(204).send(updatedCar);
        }).catch((err) => {
            res.status(400);
        });

    
}
