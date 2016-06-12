var target = require("../server/dataAccess.js");
var chai = require("chai");
var co = require('co');
var assert = chai.assert;


describe('getTestInstanceId', function () {

    it('should return a test id.', function (done) {

        co(function* () {

            var testId = yield target.getTestInstanceId({
                userId: '001',
                testType: 'PlacementTest',
                discipline: 'ENGLISH',
                setId: '01',
                sessionId: 1,
                serverId: 'TMMDEMO'
            });

            assert.isOk(testId);

            done();
        });


    });

});


describe('addTest', function () {

    it('should insert a test instance successfully.', function (done) {

        co(function* () {
            try {
                var fakeUserId = Date.now().toString();

                var testId = yield target.addTest({
                    userId: fakeUserId,
                    testType: 'PlacementTest',
                    discipline: 'ENGLISH',
                    setId: '01',
                    sessionId: 1,
                    serverId: 'TMMDEMO',
                    interfaceLanguage: 'en-US'
                });

                assert.isOk(testId);

                done();
            }
            catch (err) {
                console.log(err);
            }

        });
    });

});

describe('getTestSummaryById', function () {

    it('should return a test summary.', function (done) {

        co(function* () {
            var summary = yield target.getTestSummaryById('570ce4280706a265c14d9529');

            assert.isOk(summary);
            assert.equal(summary.testId, '570ce4280706a265c14d9529', 'test id should be the same');

            done();

        })
    });
    
    
    it('should return null because test instance doesn\'t exist', function(done){
       
       co(function*(){
           
           var summary = yield target.getTestSummaryById('faketestinstanceid');

            assert.isNull(summary);

            done();
       }) 
        
    });
    
});

describe('getTestDocument', function(){
    
    it('should return a test document.', function(done){
        
        co(function*(){
            
            var doc = yield target.getTestDocument('570ce4280706a265c14d9529');
            
            assert.isOk(doc);
            assert.equal(doc.testId, '570ce4280706a265c14d9529', 'test id should be the same');
            
            done();
            
        })
        
    })
    
});
