/**
 * Created by Simon on 2016/5/3.
 */

var target = require("../server/test.js");
var co = require("co");

co(function *(){

    var testId = yield target.initialize({
        userId: Date.now().toString(),
        testType: 'PlacementTest',
        discipline: 'ENGLISH',
        setId:  '01',
        sessionId: 1,
        serverId: 'TMMDEMO',
        interfaceLanguage: this.request.body.interfaceLanguage || 'en-US'
    });

    yield target.startTest(testId);
    
    
    
    
});

