// Packages
const _ = require('lodash');
const { ObjectID } = require('mongodb');

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

exports.getCategory = (req, res) => {

    const categoryId = req.params.id;

    if (!ObjectID.isValid(categoryId)) {
        return res.status(400).send();
    }

    Category.findOne({_id: categoryId})
        .then((category) => {
            if (!category) {
                return res.status(404).send({ msg: "category not found" });
            }
            res.send(category);
        }).catch((err) => {
            res.status(400);
        });
}

exports.updateCategory = (req, res) => {
    const categoryId = req.params.id;
    const body = _.pick(req.body, ['name']);

    if (!ObjectID.isValid(categoryId)) {
        return res.status(400).send();
    }

    const { error } = validateCategory(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    Category.findOneAndUpdate({ _id: categoryId }, { $set: body }, { new: true })
        .then((category) => {
            if (!category) {
                return res.status(404).send({ msg: "category not found" });
            }
            res.send(category);
        }).catch((err) => {
            res.status(400);
        });
}

exports.deleteCategory = (req, res) => {
    const categoryId = req.params.id;

    if (!ObjectID.isValid(categoryId)) {
        return res.status(400).send();
    }

    Category.findByIdAndDelete({ _id: categoryId })
        .then((category) => {
            if (!category) {
                return res.status(404).send();
            }
            res.send();
        }).catch((err) => {
            res.status(400);
        });
}