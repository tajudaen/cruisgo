// Packages
const expect = require("expect");
const request = require('supertest');
const { ObjectID } = require("mongodb");

// Custom modules
const { app } = require('../../app');
const { Customer } = require('../../models/customer');
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
                // .expect(res => {
                //     expect(res.body).toHaveProperty('_id');
                //     expect(res.body).toHaveProperty('phone');
                // })
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
});