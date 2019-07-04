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
    it('GET: all customers', (done) => {
        request(app)
            .get('/api/customers')
            .expect(200)
            .expect(res => {
                expect(res.body[0]).toHaveProperty('name');
            })
            .end(done);
    });
});