// Packages
const expect = require("expect");
const request = require('supertest');

// Custom modules
const { app } = require('../../app');
const { Category } = require('../../models/category');
const { seedCategories, categories } = require('../seeds/seed');


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

    describe('POST: create a category', (done) => {
        it('should create a new category', (done) => {
            const category = {
                name: "Convertible"
            };

            request(app)
                .post('/api/categories')
                .send(category)
                .expect(201)
                .expect(res => {
                    expect(res.body).toHaveProperty('_id');
                    expect(res.body).toHaveProperty('name');
                })
                .end(done);
        });

        it('should return 400 if required field is missing', (done) => {
            request(app)
                .post('/api/categories')
                .send({})
                .expect(400)
                .end(done);
        });
    });
});