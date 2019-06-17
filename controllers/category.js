const { Category } = require('./../models/category');

exports.getCategories = (req, res) => {
    Category.find()
        .then((categories) => {
            res.send(categories);
        }).catch((err) => {
            res.status(400);
        });
}