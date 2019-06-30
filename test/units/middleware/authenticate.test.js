// Packages
const mongoose = require('mongoose');
const expect = require('expect');
const sinon = require('sinon');

const { User } = require('../../../models/user');
const { authenticate } = require('../../../middlewares/authenticate');

describe('authenticate middleware', () => {
    it('should populate req.user with the payload of a valid JWT', () => {
        const user = { _id: mongoose.Types.ObjectId().toHexString(), permissions: ["create", "read", "update", "delete"] };
        const token = new User(user).generateAuthToken();

        const req = {
            header: sinon.stub().returns(token)
        };

        const res = {};

        const next = sinon.stub();

        authenticate(req, res, next);
        
        expect(req.user).toMatchObject(user);
    });

    it('should return a 401 if not token is passed', () => {
        const req = {
            header: sinon.stub().returns(null)
        };

        const mockResponse = () => {
            const res = {};
            res.status = sinon.stub().returns(res);
            res.send = sinon.stub().returns(res);
            return res;
        };

        const res = mockResponse();

        const next = sinon.stub();

        authenticate(req, res, next);
        
        expect(res.status.calledWith(401)).toBeTruthy();
        expect(res.send.calledWith('Access denied. No token provided.')).toBeTruthy();
    });

    it('should return a 400 if an invalid token is passed', () => {

        const req = {
            header: sinon.stub().returns("1234")
        };

        const mockResponse = () => {
            const res = {};
            res.status = sinon.stub().returns(res);
            res.send = sinon.stub().returns(res);
            return res;
        };

        const res = mockResponse();
        const next = sinon.stub();

        authenticate(req, res, next);

        expect(res.status.calledWith(400)).toBeTruthy();
        expect(res.send.calledWith('Invalid token.')).toBeTruthy();
    });
});