// Packages
const expect = require('expect');
const sinon = require('sinon');

const { createAccess, readAccess, updateAccess, deleteAccess } = require('../../../middlewares/access-right');

describe('access middleware', () => {
    it('should return 403 if user doesnt have necessary permissions to create', () => {

        const req = {
            user: {
                permissions: ["read"]
            }
        };

        const mockResponse = () => {
            const res = {};
            res.status = sinon.stub().returns(res);
            res.send = sinon.stub().returns(res);
            return res;
        };

        const res = mockResponse();

        const next = sinon.stub();

        createAccess(req, res, next);

        expect(res.status.calledWith(403)).toBeTruthy();
        expect(res.send.calledWith('Access denied')).toBeTruthy();
    });

    it('should return not a 403 if user have necessary permissions to create', () => {

        const req = {
            user: {
                permissions: ["create"]
            }
        };

        const mockResponse = () => {
            const res = {};
            res.status = sinon.stub().returns(res);
            res.send = sinon.stub().returns(res);
            return res;
        };

        const res = mockResponse();

        const next = sinon.stub();

        createAccess(req, res, next);

        expect(res.status.calledWith(403)).toBeFalsy();
        expect(res.send.calledWith('Access denied')).toBeFalsy();
    });

    it('should return 403 if user doesnt have necessary permissions to read', () => {

        const req = {
            user: {
                permissions: []
            }
        };

        const mockResponse = () => {
            const res = {};
            res.status = sinon.stub().returns(res);
            res.send = sinon.stub().returns(res);
            return res;
        };

        const res = mockResponse();

        const next = sinon.stub();

        readAccess(req, res, next);

        expect(res.status.calledWith(403)).toBeTruthy();
        expect(res.send.calledWith('Access denied')).toBeTruthy();
    });

    it('should return not a 403 if user have necessary permissions to read', () => {

        const req = {
            user: {
                permissions: ["read"]
            }
        };

        const mockResponse = () => {
            const res = {};
            res.status = sinon.stub().returns(res);
            res.send = sinon.stub().returns(res);
            return res;
        };

        const res = mockResponse();

        const next = sinon.stub();

        readAccess(req, res, next);

        expect(res.status.calledWith(403)).toBeFalsy();
        expect(res.send.calledWith('Access denied')).toBeFalsy();
    });

    it('should return 403 if user doesnt have necessary permissions to update', () => {

        const req = {
            user: {
                permissions: []
            }
        };

        const mockResponse = () => {
            const res = {};
            res.status = sinon.stub().returns(res);
            res.send = sinon.stub().returns(res);
            return res;
        };

        const res = mockResponse();

        const next = sinon.stub();

        updateAccess(req, res, next);

        expect(res.status.calledWith(403)).toBeTruthy();
        expect(res.send.calledWith('Access denied')).toBeTruthy();
    });

    it('should return not a 403 if user have necessary permissions to update', () => {

        const req = {
            user: {
                permissions: ["update"]
            }
        };

        const mockResponse = () => {
            const res = {};
            res.status = sinon.stub().returns(res);
            res.send = sinon.stub().returns(res);
            return res;
        };

        const res = mockResponse();

        const next = sinon.stub();

        updateAccess(req, res, next);

        expect(res.status.calledWith(403)).toBeFalsy();
        expect(res.send.calledWith('Access denied')).toBeFalsy();
    });

    it('should return 403 if user doesnt have necessary permissions to delete', () => {

        const req = {
            user: {
                permissions: ["read"]
            }
        };

        const mockResponse = () => {
            const res = {};
            res.status = sinon.stub().returns(res);
            res.send = sinon.stub().returns(res);
            return res;
        };

        const res = mockResponse();

        const next = sinon.stub();

        deleteAccess(req, res, next);

        expect(res.status.calledWith(403)).toBeTruthy();
        expect(res.send.calledWith('Access denied')).toBeTruthy();
    });

    it('should return not a 403 if user have necessary permissions to delete', () => {

        const req = {
            user: {
                permissions: ["delete"]
            }
        };

        const mockResponse = () => {
            const res = {};
            res.status = sinon.stub().returns(res);
            res.send = sinon.stub().returns(res);
            return res;
        };

        const res = mockResponse();

        const next = sinon.stub();

        deleteAccess(req, res, next);

        expect(res.status.calledWith(403)).toBeFalsy();
        expect(res.send.calledWith('Access denied')).toBeFalsy();
    });
});