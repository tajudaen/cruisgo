// Packages
const expect = require("expect");
const request = require('supertest');


// Custom modules
const { app } = require('./../../app');
const { seedUsers, users } = require('./../seeds/seed');

beforeEach(seedUsers);

describe('feat/registration-login', () => {
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
                    expect(res.body).toHaveProperty('email');
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

        // it("should not create user if email in use", done => {
        //     request(app)
        //         .post('/api/register')
        //         .send({email: users[0].email, password: "password1"})
        //         .expect(400)
        //         .end(done);
        // });
    });

    describe('Login', () => {
        it('should login user and return auth token', done => {
            request(app)
                .post('/api/login')
                .send({
                    email: users[1].email,
                    password: "password"
                })
                .expect(200)
                .expect(res => {
                    expect(res.headers["x-auth-token"]).toBeTruthy();
                })
                .end(done);
        });

        it('should reject invalid login', done => {
            request(app)
                .post('/api/login')
                .send({
                    email: users[1].email,
                    password: users[1].password + 'fake'
                })
                .expect(400)
                .expect(res => {
                    expect(res.headers["x-auth"]).toBeFalsy();
                })
                .end(done);
        });
    });
});