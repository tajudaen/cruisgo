// Packages
const { ObjectID } = require('mongodb');

// Custom modules
const { Category } = require('./../../models/category');
const { User } = require('./../../models/user');
const { Car } = require('./../../models/car');
const { Customer } = require('./../../models/customer');
const { Rental } = require('./../../models/rental');

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
];

const cars = [{
    _id: new ObjectID(),
    name: "Honda civic",
    numberInStock: 10,
    dailyRentalRate: 100,
    category: categories[0],
    details: { brand: "Honda", model: "2014", color: "black" }
},
{
    _id: new ObjectID(),
    name: "Mustang",
    numberInStock: 0,
    dailyRentalRate: 40,
    category: categories[1],
    details: { brand: "Ford", model: "2015", color: "orange" }
},
{
    _id: new ObjectID(),
    name: "Bentley",
    numberInStock: 4,
    dailyRentalRate: 60,
    category: categories[1],
    details: { brand: "Kia", model: "2017", color: "blue" }
}
];

const customers = [{
    _id: new ObjectID(),
    name: "John Doe",
    phone: "1234567890"
},
    {
    _id: new ObjectID(),
    name: "Foxy Brown",
    phone: "0987654321"
}];

const rentals = [{
    _id: new ObjectID(),
    customer: customers[0],
    car: {
        _id: cars[0]._id,
        name: cars[0].name,
        dailyRentalRate: cars[0].dailyRentalRate
    }
}, {
    _id: new ObjectID(),
    customer: customers[0],
    car: {
        _id: cars[1]._id,
        name: cars[1].name,
        dailyRentalRate: cars[1].dailyRentalRate
    }
}, {
    _id: new ObjectID(),
    customer: customers[1],
    car: {
        _id: cars[0]._id,
        name: cars[0].name,
        dailyRentalRate: cars[0].dailyRentalRate
    }
}];

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
};

const seedCustomers = done => {
    Customer.deleteMany({})
        .then(() => {
            Customer.insertMany(customers);
        }).then(() => done());
}

const seedRentals = done => {
    Rental.deleteMany({})
        .then(() => {
            Rental.insertMany(rentals);
        }).then(() => done());
}

module.exports = {categories, seedCategories, users, seedUsers, seedCars, cars, seedCustomers, customers, seedRentals, rentals};