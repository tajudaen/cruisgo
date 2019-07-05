// Packages
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);


exports.validateCategory = (category) => {
    const schema = {
        name: Joi.string().min(3).max(50).required()
    };

    return Joi.validate(category, schema);
}

exports.validateUser = (user) => {
    const schema = {
        name: Joi.string().min(5).max(50).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required(),
        permissions: Joi.array().required()
    };

    return Joi.validate(user, schema);
};

exports.validateLoginCredentials = (req) => {
    const schema = {
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required()
    };

    return Joi.validate(req, schema);
};

exports.validateCar = (car) => {
    const schema = {
        name: Joi.string().min(5).max(50).required(),
        numberInStock: Joi.number().min(0).required(),
        dailyRentalRate: Joi.number().min(0).required(),
        categoryId: Joi.objectId().required(),
        details: Joi.object().keys({
            brand: Joi.string().required(),
            model: Joi.string().required(),
            color: Joi.string().required()
        })
    };

    return Joi.validate(car, schema);
};

exports.validateCustomer = (customer) => {
    const schema = {
        name: Joi.string().min(3).max(50).required(),
        phone: Joi.string().min(10).required(),
    };

    return Joi.validate(customer, schema);
}