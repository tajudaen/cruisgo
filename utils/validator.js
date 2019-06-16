// Packages
const Joi = require('joi');


exports.validateCategory = (category) => {
    const schema = {
        name: Joi.string().min(3).max(50).required()
    };

    return Joi.validate(category, schema);
}