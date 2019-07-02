// Packages
const { ObjectID } = require('mongodb');

// Custom modules
const { Category } = require('./../../models/category');
const { User } = require('./../../models/user');
const { Car } = require('./../../models/car');

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

const users = [{
        _id: new ObjectID(),
        name: "Jane Doe",
        email: "dummy1@mail.com",
        password: "password",
        permissions: ["create", "read", "update", "delete"]
    },
    {
        _id: new ObjectID(),
        name: "Rex Fox",
        email: "dummy@example.com",
        password: "password",
        permissions: ["read"]
    }
]

const cars = [{
        _id: new ObjectID(),
        name: "Honda civic",
        numberInStock: 10,
        dailyRentalRate: 100,
        category: categories[0],
        details: {brand: "Honda", model: "2014", color: "black"}
    },
    {
        _id: new ObjectID(),
        name: "Mustang",
        numberInStock: 5,
        dailyRentalRate: 40,
        category: categories[1],
        details: {brand: "Ford", model: "2015", color: "orange"}
    }
]

const seedCategories = done => {
    Category.deleteMany({})
        .then(() => {
            Category.insertMany(categories);
        })
        .then(() => done());
};

const seedUsers = done => {
    User.deleteMany({})
        .then(() => {
            const userOne = new User(users[0]).save();
            const userTwo = new User(users[1]).save();

            return Promise.all([userOne, userTwo]);
        }).then(() => done());
};

const seedCars = done => {
    Car.deleteMany({})
        .then(() => {
            Car.insertMany(cars);
        }).then(() => done());
}

module.exports = {categories, seedCategories, users, seedUsers, seedCars, cars};