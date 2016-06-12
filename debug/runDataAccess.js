/**
 * Created by Simon on 2016/5/3.
 */

var da = require("../server/dataAccess.js");
var co = require('co');

// da.getTestInstanceId({
//         userId: '001',
//         testType: 'PlacementTest',
//         discipline: 'ENGLISH',
//         setId: '01',
//         sessionId: '1',
//         serverId: 'TMMDEMO'
//     })
//     .then(function (result) {
//         console.log(result);
//     }, function (err) {
//         console.log(err);
//     })


co(function* () {

    var fakeUserId = Date.now().toString();

    var testId = yield da.addTest({
        userId: fakeUserId,
        testType: 'PlacementTest',
        discipline: 'ENGLISH',
        setId: '01',
        sessionId: 1,
        serverId: 'TMMDEMO',
        interfaceLanguage: 'en-US'
    });
    
    console.log(testId);

})