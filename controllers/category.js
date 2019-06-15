// Packages
const _ = require('lodash');

// Custom modules
const { Category } = require('./../models/category');

exports.getCategories = (req, res) => {
    Category.find()
        .then((categories) => {
            res.send(categories);
        }).catch((err) => {
            res.status(400);
        });
}

exports.postCategory = (req, res) => {
    const category = new Category({ name: req.body.name });

    category.save()
        .then((category) => {
            res.status(201).send(category);
        }).catch((err) => {
            res.status(400);
        });
}