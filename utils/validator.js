// Packages
const Joi = require('joi');


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