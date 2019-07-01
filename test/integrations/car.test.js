// Packages
const request = require("supertest");
const expect = require("expect");
const { ObjectID } = require("mongodb");


// Custom modules
const { app } = require("../../app");
const { seedCars, cars, categories } = require('../seeds/seed');
const { User } = require('../../models/user');


beforeEach(seedCars);

describe('feat/car', () => {
    let token;
    beforeEach(() => {
        const user = { _id: ObjectID().toHexString(), permissions: ["create", "read", "update", "delete"] };
        token = new User(user).generateAuthToken();
    });

    describe('GET: all cars', () => {
        it('should return all cars', (done) => {
            request(app)
                .get('/api/cars')
                .expect(200)
                .expect(res => {
                    expect(res.body[0]).toHaveProperty('name');
                })
                .end(done);
        });
    });

    describe('POST: create a car', () => {
        it('should create a new car when an authenticated user with permission to create try to create', (done) => {
            const car = {
                name: "Nissan",
                numberInStock: 5,
                dailyRentalRate: 40,
                categoryId: categories[1]._id.toHexString(),
                details: { brand: "Ford", model: "2015", color: "orange" }
            };

            request(app)
                .post('/api/cars')
                .set('x-auth-token', token)
                .send(car)
                .expect(201)
                .expect(res => {
                    expect(res.body).toHaveProperty('_id');
                    expect(res.body).toHaveProperty('name');
                    expect(res.body.details).toHaveProperty('color');
                })
                .end(done);
        });

        it('should return 400 if required fields are missing', (done) => {
            const car = {};

            request(app)
                .post('/api/cars')
                .set('x-auth-token', token)
                .send(car)
                .expect(400)
                .end(done);
        });

        it('should return 400 if category doesnt exist', (done) => {
            const car = {
                name: "Nissan",
                numberInStock: 5,
                dailyRentalRate: 40,
                categoryId: new ObjectID().toHexString(),
                details: { brand: "Ford", model: "2015", color: "orange" }
            };

            request(app)
                .post('/api/cars')
                .set('x-auth-token', token)
                .send(car)
                .expect(400)
                .end(done);
        });
        
        it('should return 400 if required fields are missing', (done) => {
            const car = {};

            request(app)
                .post('/api/cars')
                .set('x-auth-token', token)
                .send(car)
                .expect(400)
                .end(done);
        });
    });

    describe('GET:id car', () => {
        it('should return a car when given a valid Id', (done) => {
            request(app)
                .get(`/api/cars/${cars[0]._id.toHexString()}`)
                .set('x-auth-token', token)
                .expect(200)
                .expect(res => {
                    expect(res.body).toHaveProperty('_id');
                    expect(res.body._id).toBe(cars[0]._id.toHexString());
                    expect(res.body.category).toHaveProperty('name');
                })
                .end(done);
        });
    });
});