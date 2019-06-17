// Packages
const expect = require("expect");
const request = require('supertest');


// Custom modules
const { app } = require('./../../app');
const { User } = require('./../../models/user');

describe('Register', () => {
    it('should register and return a new user', (done) => {
        const user = {
            name: "Giwa Tajudeen",
            email: "dev@mail.com",
            password: "password",
            role: 1
        }
        request(app)
            .post('/api/register')
            .send(user)
            .expect(200)
            .expect(res => {
                expect(res.body).toHaveProperty('name');
                expect(res.headers).toHaveProperty('x-auth-token');
            })
            .end(done);
    });

    it('should return a 400 if required fields are missing', (done) => {
        request(app)
            .post('/api/register')
            .send({})
            .expect(400)
            .end(done);
    });

    it("should not create user if email in use", done => {
        const email = "dummy@example.com";
        const password = "password";

        request(app)
            .post('/users')
            .send({email, password})
            .expect(400)
            .end(done);
    });
});