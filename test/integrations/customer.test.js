// Packages
const expect = require("expect");
const request = require('supertest');
const { ObjectID } = require("mongodb");

// Custom modules
const { app } = require('../../app');
const { seedCustomers, customers } = require('../seeds/seed');

beforeEach(seedCustomers);

describe('feat/customer', () => {
    describe('GET: all customers', () => {
        it('should return all customers', (done) => {
            request(app)
                .get('/api/customers')
                .expect(200)
                .expect(res => {
                    expect(res.body[0]).toHaveProperty('name');
                })
                .end(done);
        });
    });

    describe('GET:id customer', () => {
        it('should return the customer with the valid id', (done) => {
            request(app)
                .get(`/api/customers/${customers[0]._id.toHexString()}`)
                .expect(200)
                .expect(res => {
                    expect(res.body).toHaveProperty('name');
                })
                .end(done);
        });

        it('should return 400 if an invalid id is given', (done) => {
            request(app)
                .get('/api/customers/1234')
                .expect(400)
                .end(done);
        });
        
        it('should return 404 if a valid id of a non-existing cusstomer is given', (done) => {
            const ID = new ObjectID().toHexString();

            request(app)
                .get(`/api/customers/${ID}`)
                .expect(404)
                .end(done);
        });
    });

    describe('POST: customer', () => {
        it('should create a customer', (done) => {
            const customer = {
                name: "Ada Love",
                phone: "1111111111"
            }

            request(app)
                .post('/api/customers')
                .send(customer)
                .expect(200)
                .expect(res => {
                    expect(res.body).toHaveProperty('_id');
                    expect(res.body).toHaveProperty('phone');
                })
                .end(done);
        });

        it('should return 400 if required fields are missing', (done) => {
            request(app)
                .post('/api/customers')
                .send({})
                .expect(400)
                .end(done);
        });
    });

    describe('PUT:id customer', () => {
        it('should update a customer with a valid id', (done) => {
            request(app)
                .put(`/api/customers/${customers[0]._id.toHexString()}`)
                .send({ phone: "01234554321" })
                .expect(200)
                .end(done);
        });

        it('should return a 400 if an invalid id is given', (done) => {
            request(app)
                .put('/api/customers/1234')
                .send({ phone: "01234554321" })
                .expect(400)
                .end(done);
        });

        it('should return a 404 if an id which doesnt exist', (done) => {

            const Id = new ObjectID().toHexString();

            request(app)
                .put(`/api/customers/${Id}`)
                .send({ phone: "01234554321" })
                .expect(404)
                .end(done);
        });
    });
});