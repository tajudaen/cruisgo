// Packages
const expect = require("expect");
const request = require('supertest');
const { ObjectID } = require("mongodb");

// Custom modules
const { app } = require('../../app');
const { seedRentals, rentals } = require('../seeds/seed');
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
                .expect(res => {
                    expect(res.body[0].rentalFee).toBe(rentals[2].rentalFee);
                })
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
});