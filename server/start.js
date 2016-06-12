var debug = require('debug')('startController');
var test = require('./test.js');

module.exports = {

    start: function *(next) {

        var testParameters = {
            userId: this.request.body.userId,
            testType: this.request.body.testType,
            discipline: this.request.body.discipline,
            setId: this.request.body.questionSetId || '01',
            sessionId: this.request.body.sessionId || 1,
            serverId: this.request.body.serverId,
            interfaceLanguage: this.request.body.interfaceLanguage || 'en-US',
            fullName : this.request.body.fullName
        };

        debug('entering start function. %s', testParameters);

        var testId = yield test.initialize(testParameters);
        
        debug('initialize test instance, get test id : %s', testId);
        

        // this.body = "test id :" +  testId;
        this.redirect('/test/welcome/'+ testId + '/' + testParameters.interfaceLanguage);
    }
}