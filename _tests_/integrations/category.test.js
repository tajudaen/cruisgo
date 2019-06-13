const expect = require("expect");
const request = require('supertest');

const { app } = require('../../app');

const { Category } = require('../../models/category');

describe('feat/category', () => {
    describe('GET: all categories', () => {
        it('should return all categories', (done) => {
            request(app)
                .get('api/categories')
                .expect(200)
                .end(done);
        });
    });
});