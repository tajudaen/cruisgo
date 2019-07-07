// Packages
const expect = require("expect");
const request = require('supertest');
const { ObjectID } = require("mongodb");

// Custom modules
const { app } = require('../../app');
const { seedRentals, rentals, customers, cars } = require('../seeds/seed');
const { User } = require('../../models/user');

beforeEach(seedRentals);


describe('feat/rental', () => {

    describe('GET: all rentals', () => {
        const user = { _id: ObjectID().toHexString(), permissions: ["create", "read", "update", "delete"] };
        const token = new User(user).generateAuthToken();

        it('should return all rentals', (done) => {
            request(app)
                .get('/api/rentals')
                .set('x-auth-token', token)
                .expect(200)
                .end(done);
        });

        it('should return 403 if an unauthorized user tries to access', (done) => {
            const user = { _id: ObjectID().toHexString(), permissions: ["create", "update", "delete"] };
            const token = new User(user).generateAuthToken();
    
            request(app)
                .get('/api/rentals')
                .set('x-auth-token', token)
                .expect(403)
                .end(done);
        });
    });

    describe('POST: rental', () => {
        it('should create a rental resource', (done) => {
            const rental = {
                customerId: customers[0]._id.toHexString(),
                carId: cars[0]._id.toHexString()
            };

            request(app)
                .post('/api/rentals')
                .send(rental)
                .expect(200)
                .expect(res => {
                    expect(res.body.customer._id).toBe(customers[0]._id.toHexString())
                })
                .end(done);
        });

        it('should return a 400 if a customerId which doesnt exist is given', (done) => {
            const rental = {
                customerId: new ObjectID().toHexString(),
                carId: cars[0]._id.toHexString()
            };

            request(app)
                .post('/api/rentals')
                .send(rental)
                .expect(400)
                .end(done);
        });

        it('should return a 400 if a carId which doesnt exist is given', (done) => {
            const rental = {
                customerId: customers[1]._id.toHexString(),
                carId: new ObjectID().toHexString()
            };

            request(app)
                .post('/api/rentals')
                .send(rental)
                .expect(400)
                .end(done);
        });

        it('should return a 400 if car is not in stock', (done) => {
            const rental = {
                customerId: customers[0]._id.toHexString(),
                carId: cars[1]._id.toHexString()
            };

            request(app)
                .post('/api/rentals')
                .send(rental)
                .expect(400)
                .end(done);
        });
    });
});