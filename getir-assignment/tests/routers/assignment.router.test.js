const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const server = require('../../index');
const AssignmentService = require('../../services/assignment-service');
const expect = chai.expect;
chai.use(chaiHttp);

const TEST_SUCCESS_RESPONSE = 'ASSIGNMENT_POST_SUCCESS';
const TEST_ERROR_RESPONSE = 'ERR';

describe('/assignment endpoint test', () => {
    let testServiceStub = null;
    beforeEach(() => {
        testServiceStub = sinon.stub(AssignmentService.prototype, 'createAssignmentRecord').callsFake(() => TEST_SUCCESS_RESPONSE);
    });
    afterEach(()=> {
        testServiceStub.restore();
    });
    it('post /assignment should be success with valid parameters',  (done) => {
        chai.request(server)
            .post('/assignment')
            .send({
                startDate: '2019-01-30',
                endDate: '2020-06-29',
                minCount: 2700,
                maxCount: 3000
            })
            .end(function (err, res) {
                expect(res.body.code).to.equal(TEST_SUCCESS_RESPONSE);
                done();
            });
    });
    it('post /assignment should be failed with invalid or missing parameters',  (done) => {
        chai.request(server)
            .post('/assignment')
            .send({
                minCount: 2700,
                maxCount: 3000
            })
            .end(function (err, res) {
                expect(res.body.code).to.equal(TEST_ERROR_RESPONSE);
                done();
            });
    });
    it('get /assignment should be failed, because endpoint accept post requests only',  (done) => {
        chai.request(server)
            .get('/assignment')
            .end(function (err, res) {
                expect(res.status).to.equal(errorConst.ERR_NOT_FOUND);
                done();
            });
    })
});
  