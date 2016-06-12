/**
 * Created by Simon on 2016/4/27.
 */
var target = require("../server/questionBank.js");
var co = require("co");

co(target.getFirstStageOfPlacementTest('ENGLISH', '01', '1')).then(function (data) {

    data.forEach(function (question, index) {
        console.log("%s, %s, %s", question.QuestionId, question.Level, question.IsGrammarSkills);
    });
    // console.log(JSON.stringify(data));
});

co(target.getSecondStageOfPlacementTest('ENGLISH','01',1,4)).then(function(data){
    data.forEach(function (question, index) {
        console.log("%s, %s, %s", question.QuestionId, question.Level, question.IsGrammarSkills);
    });
});

co(target.getThirdStageOfPlacementTest('ENGLISH','01',1,5)).then(function(data){
    data.forEach(function (question, index) {
        console.log("%s, %s, %s", question.QuestionId, question.Level, question.IsGrammarSkills);
    });
});
