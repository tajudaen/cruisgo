// Packages
const expect = require("expect");
const request = require('supertest');

// Custom modules
const { app } = require('../../app');
const { Category } = require('../../models/category');
const { seedCategories } = require('../seeds/seed');


beforeEach(seedCategories);

describe('feat/category', () => {
    describe('GET: all categories', () => {
        it('should return all categories', (done) => {
            request(app)
                .get('/api/categories')
                .expect(200)
                .expect(res => {
                    expect(res.body[0]).toHaveProperty('name');
                })
                .end(done);
        });
    });
});