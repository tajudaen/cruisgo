// Packages
const _ = require('lodash');

// Custom modules
const { Category } = require('./../models/category');
const { validateCategory } = require('./../utils/validator');

exports.getCategories = (req, res) => {
    Category.find()
        .then((categories) => {
            res.send(categories);
        }).catch((err) => {
            res.status(400);
        });
}

exports.postCategory = (req, res) => {
    const { error } = validateCategory(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    const category = new Category({ name: req.body.name });

    category.save()
        .then((category) => {
            res.status(201).send(category);
        }).catch((err) => {
            res.status(400);
        });
}