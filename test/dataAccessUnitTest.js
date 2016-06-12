/**
 * Created by Simon on 2016/5/3.
 */

var target = require("../server/dataAccess.js");
var chai = require("chai");
var co = requir('co');

chai.should();
var chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);

describe('getTestInstanceId', function () {
    it('should return a test Id', function () {
        return target.getTestInstanceId({
            userId: '001',
            testType: 'PlacementTest',
            discipline: 'ENGLISH',
            setId: '01',
            sessionId: 1,
            serverId: 'TMMDEMO'
        }).should.eventually.ok;
    });

    it('should return null. test instance not found because of invalid user Id', function () {

        return target.getTestInstanceId({
            userId: 'InvalidUserId',
            testType: 'PlacementTest',
            discipline: 'ENGLISH',
            setId: '01',
            sessionId: 1,
            serverId: 'TMMDEMO'
        }).should.eventually.null;
    });

    it('should return null, test instance not found because of invalid test type', function () {
        return target.getTestInstanceId({
            userId: '001',
            testType: 'InvalidTestType',
            discipline: 'ENGLISH',
            setId: '01',
            sessionId: 1,
            serverId: 'TMMDEMO'
        }).should.eventually.null;
    });

    it('should return null, test instance not found because of invalid discipline', function () {
        return target.getTestInstanceId({
            userId: '001',
            testType: 'PlacementTest',
            discipline: 'InvalidDiscipline',
            setId: '01',
            sessionId: 1,
            serverId: 'TMMDEMO'
        }).should.eventually.null;
    });

    it('should return null, test instance not found because of invalid set id', function () {
        return target.getTestInstanceId({
            userId: '001',
            testType: 'PlacementTest',
            discipline: 'ENGLISH',
            setId: 'invalid set id',
            sessionId: 1,
            serverId: 'TMMDEMO'
        }).should.eventually.null;
    });

    it('should return null, test instance not found because of invalid session id', function () {
        return target.getTestInstanceId({
            userId: '001',
            testType: 'PlacementTest',
            discipline: 'ENGLISH',
            setId: '01',
            sessionId: 8,
            serverId: 'TMMDEMO'
        }).should.eventually.null;
    });

    it('should return null, test instance not found because of invalid server id', function () {
        return target.getTestInstanceId({
            userId: '001',
            testType: 'PlacementTest',
            discipline: 'ENGLISH',
            setId: '01',
            sessionId: 1,
            serverId: 'invalid server id'
        }).should.eventually.null;
    });

    it('should return null, test instance not found because all parameters are null', function () {
        return target.getTestInstanceId({
            userId: null,
            testType: null,
            discipline: null,
            setId: null,
            sessionId: null,
            serverId: null
        }).should.eventually.null;
    });
});

describe('addTest', function(){

    var fakeUserId = Date.now().toString();

    it('should insert successfully', function(){
       return target.addTest({
           userId: fakeUserId,
           testType: 'PlacementTest',
           discipline: 'ENGLISH',
           setId: '01',
           sessionId: 1,
           serverId: 'TMMDEMO'
       }).should.eventually.ok;

    });

    it('should be rejected because test instance already inserted', function(){
        return target.addTest({
            userId: fakeUserId,
            testType: 'PlacementTest',
            discipline: 'ENGLISH',
            setId: '01',
            sessionId: 1,
            serverId: 'TMMDEMO'
        }).should.be.rejected;
    });

});

describe('getTestDocument',function(){
   it('should return a initial test document, because test document not found.', function(){
       return target.getTestDocument('InvalidTestId').should.eventually.property('testId', 'InvalidTestId');
   }) ;


});