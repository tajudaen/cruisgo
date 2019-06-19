// Packages
const expect = require("expect");
const request = require('supertest');
const {
    ObjectID
} = require("mongodb");

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

    describe('POST: create a category', () => {
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

    describe('GET:id category', () => {
        it('should return a category when a valid id is given', (done) => {
            request(app)
                .get(`/api/categories/${categories[0]._id.toHexString()}`)
                .expect(200)
                .expect(res => {
                    expect(res.body).toHaveProperty('_id');
                    expect(res.body._id).toBe(categories[0]._id.toHexString());
                })
                .end(done);
        });

        it('should return 404 if invalid id is given', (done) => {
            request(app)
                .get('/api/categories/1234')
                .expect(400)
                .end(done);
        });

        it('should return 404 if no category is found when given a valid id', (done) => {
            const categoryId = ObjectID().toHexString();
            request(app)
                .get(`/api/categories/${categoryId}`)
                .expect(404)
                .expect(res => {
                    expect(res.body).toHaveProperty('msg');
                })
                .end(done);

        });
    });

    describe('PUT:id category', () => {
        it('should update an existing category', (done) => {
            request(app)
                .put(`/api/categories/${categories[0]._id.toHexString()}`)
                .send({name: "updatedCategory"})
                .expect(200)
                .expect(res => {
                    expect(res.body.name).toBe("updatedCategory");
                })
                .end(done);
        });

        it('should return 400 if an invalid id is given', (done) => {
            request(app)
                .get('/api/categories/1234')
                .expect(400)
                .end(done);
        });

        it('should return 404 if record doesnt exist for a valid id', (done) => {
            const categoryId = ObjectID().toHexString();
            request(app)
                .get(`/api/categories/${categoryId}`)
                .send({name: "updatedCategory"})
                .expect(404)
                .end(done);
        });
    });

    describe('DELETE:id category', () => {
        it('should delete a category with a valid id', (done) => {
            request(app)
                .delete(`/api/categories/${categories[0]._id.toHexString()}`)
                .expect(200)
                .end(done);
        });

        it('should return 404 if category id doesnt exist', (done) => {
            const categoryId = ObjectID().toHexString();
            request(app)
                .delete(`/api/categories/${categoryId}`)
                .expect(404)
                .end(done);
        });

        it('should return 400 if an invalid id is given', (done) => {
            request(app)
                .delete('/api/categories/1234')
                .expect(400)
                .end(done);
        });
    });
});