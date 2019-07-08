// Packages
const expect = require("expect");
const request = require('supertest');
const { ObjectID } = require("mongodb");
const moment = require('moment');

// Custom modules
const { app } = require('../../app');
const { seedRentals, rentals, customers, cars, seedCars } = require('../seeds/seed');
const { User } = require('../../models/user');
const { Rental } = require('../../models/rental');
const { Car } = require('../../models/car');

beforeEach(seedCars);
beforeEach(seedRentals);


describe('feat/rental', () => {

    let token;
    beforeEach(() => {
        const user = { _id: ObjectID().toHexString(), permissions: ["create", "read", "update", "delete"] };
        token = new User(user).generateAuthToken();
    })

    describe('GET: all rentals', () => {
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
                .set('x-auth-token', token)
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
                .set('x-auth-token', token)
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
                .set('x-auth-token', token)
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
                .set('x-auth-token', token)
                .send(rental)
                .expect(400)
                .end(done);
        });
    });

    describe('POST: return rented car', () => {
        it('should return 401 if client is not logged In', (done) => {
            request(app)
                .post('/api/rentals/returns')
                .send({})
                .expect(401)
                .end(done);
        });

        it('should return 400 if customerId is not provided', (done) => {
            const carId = new ObjectID().toHexString();

            request(app)
                .post('/api/rentals/returns')
                .set('x-auth-token', token)
                .send({carId})
                .expect(400)
                .end(done);
        });

        it('should return 400 if carId is not provided', (done) => {
            const customerId = new ObjectID().toHexString();

            request(app)
                .post('/api/rentals/returns')
                .set('x-auth-token', token)
                .send({customerId})
                .expect(400)
                .end(done);
        });

        it('should return 400 if carId is not provided', (done) => {
            const customerId = new ObjectID().toHexString();
            const carId = new ObjectID().toHexString();

            request(app)
                .post('/api/rentals/returns')
                .set('x-auth-token', token)
                .send({customerId, carId})
                .expect(404)
                .end(done);
        });

        it('should return 400 if return is already processed', (done) => {
            const rental = new Rental({
                _id: new ObjectID(),
                customer: customers[0],
                car: {
                    _id: cars[2]._id,
                    name: cars[2].name,
                    dailyRentalRate: cars[2].dailyRentalRate
                },
                dateReturned: new Date()
            });

            rental.save()
                .then((result) => {
                });

            const customerId = customers[0]._id.toHexString();
            const carId = cars[2]._id.toHexString();

            request(app)
                .post('/api/rentals/returns')
                .set('x-auth-token', token)
                .send({customerId, carId})
                .expect(400)
                .end(done);
        });

        it('should return 200 if valid request', (done) => {
            const customerId = customers[0]._id.toHexString();
            const carId = cars[0]._id.toHexString();

            request(app)
                .post('/api/rentals/returns')
                .set('x-auth-token', token)
                .send({customerId, carId})
                .expect(200)
                .end(done);
        });

        it('should set a return date if valid request', (done) => {
            const customerId = customers[0]._id.toHexString();
            const carId = cars[0]._id.toHexString();

            request(app)
                .post('/api/rentals/returns')
                .set('x-auth-token', token)
                .send({customerId, carId})
                .expect(200)
                .expect(res => {
                    expect(res.body.dateReturned).toBeTruthy();
                })
                .end(done);
        });

        it('should calculate the rental fee if valid request', (done) => {
            const rental = new Rental({
                _id: new ObjectID(),
                customer: customers[0],
                car: {
                    _id: cars[2]._id,
                    name: cars[2].name,
                    dailyRentalRate: cars[2].dailyRentalRate
                }
            });

            rental.save()
                .then((result) => {
                    result.dateOut = moment().add(-7, 'days').toDate();
                    return result.save();
                }).then(() => {

                });

            const customerId = customers[0]._id.toHexString();
            const carId = cars[2]._id.toHexString();

            request(app)
                .post('/api/rentals/returns')
                .set('x-auth-token', token)
                .send({customerId, carId})
                .expect(200)
                .expect(res => {
                    expect(res.body.rentalFee).toBe(420);
                })
                .end(done);
        });

        it('should increase the car stock', (done) => {
            const rental = new Rental({
                _id: new ObjectID(),
                customer: customers[0],
                car: {
                    _id: cars[2]._id,
                    name: cars[2].name,
                    dailyRentalRate: cars[2].dailyRentalRate
                }
            });

            rental.save()
                .then((result) => {
                });

            const customerId = customers[0]._id.toHexString();
            const carId = cars[2]._id.toHexString();

            request(app)
                .post('/api/rentals/returns')
                .set('x-auth-token', token)
                .send({customerId, carId})
                .expect(200)
                .end(err => {
                    if (err) {
                        return done(err);
                    }
                    Car.findOne({_id: carId})
                        .then((car) => {
                            expect(car.numberInStock).toBe(cars[2].numberInStock + 1);
                            done();
					    })
                        .catch(err => done(err));
                });
        });
    });
});