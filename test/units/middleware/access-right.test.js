// Packages
const expect = require('expect');
const sinon = require('sinon');

const { User } = require('../../../models/user');
const { createAccess } = require('../../../middlewares/access-right');

describe('access middleware', () => {
    it('should return 403 if user doesnt have necessary permissions to create', () => {

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

        createAccess(req, res, next);

        expect(res.status.calledWith(403)).toBeTruthy();
        expect(res.send.calledWith('Access denied')).toBeTruthy();
    });
});