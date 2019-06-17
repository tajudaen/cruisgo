// Packages
const { ObjectID } = require('mongodb');

// Custom modules
const { Category } = require('./../../models/category');

const categories = [{
        _id: new ObjectID(),
        name: "Trucks"
    },
    {
        _id: new ObjectID(),
        name: "SUVs"
    },
    {
        _id: new ObjectID(),
        name: "Convertible"
    }
];

const seedCategories = done => {
    Category.deleteMany({})
        .then(() => {
            Category.insertMany(categories);
        })
        .then(() => done());
};

module.exports = {categories, seedCategories};