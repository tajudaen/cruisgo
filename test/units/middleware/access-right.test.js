// Packages
const expect = require('expect');
const sinon = require('sinon');

const { User } = require('../../../models/user');
const { access } = require('../../../middlewares/access-right');

describe('access middleware', () => {
    it('should return 403 if user role is not equal to 1', () => {

        const req = {
            user: {
                role: sinon.stub().returns(12)
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

        access(req, res, next);
        
        expect(res.status.calledWith(403)).toBeTruthy();
        expect(res.send.calledWith('Access denied')).toBeTruthy();
    });
});