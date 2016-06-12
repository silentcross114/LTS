/**
 * Created by Simon on 2016/4/11.
 */

var da = require('./dataAccess.js');
var placementTest = require('./placementTest.js');
var debug = require('debug')('test');

module.exports = {
    initialize: initialize,
    welcome: welcome,
    startTest,
    getNextQuestion,
    run,
    submitAnswer,
    result,
    addMediumUrl
};

function* initialize(testParameters) {
    var testInstanceId = yield da.getTestInstanceId(testParameters);

    if (!testInstanceId) {
        var newTestInstanceId = yield da.addTest(testParameters);
        return newTestInstanceId;
    }
    else {
        return testInstanceId;
    }

}

function* welcome(next) {

    debug('entering test.welcome with test Id = %s', this.params.testId);

    var ctx = this;
    var testSummary = yield (da.getTestSummaryById(this.params.testId));

    var testHandler = getTestHandlerById(testSummary.testType);

    yield* (testHandler.welcome.call(ctx, this.params.testId, this.params.interfaceLanguage));

}

function* run(next) {

    debug('entering test.welcome with test Id = %s, interfaceLanguage = %s', this.params.testId, this.params.interfaceLanguage);
    var ctx = this;

    var testSummary = yield (da.getTestSummaryById(this.params.testId));

    var testHandler = getTestHandlerById(testSummary.testType);

    yield (testHandler.run.call(ctx, this.params.testId, this.params.interfaceLanguage));

}


function* startTest(next) {
    var ctx = this;
    var testId = this.params.testId;
    var testSummary = yield (da.getTestSummaryById(testId));
    var testHandler = getTestHandlerById(testSummary.testType);

    yield* (testHandler.startTest.call(ctx, testId, "en-US"));
    yield next;
}

function* getNextQuestion(next) {

    if (this.request.body.fetchNext == 'false') {
        this.body = null;
    }
    else {

        var ctx = this;
        var testId = this.request.body.testId;
        var interfaceLanguage = this.request.body.interfaceLanguage;
        var testSummary = yield (da.getTestSummaryById(testId));
        var testHandler = getTestHandlerById(testSummary.testType);

        var nextQuestion = yield testHandler.getNextQuestion(testId, interfaceLanguage);

        this.testInfo = {
            discipline: testSummary.discipline,
            testType: testSummary.testType,
            setId: testSummary.setId
        }

        this.body = nextQuestion;
    }

    yield next;

}

function* submitAnswer(next) {
    var testId = this.request.body.testId;
    var questionId = this.request.body.questionId;
    var userAnswerIndex = this.request.body.userAnswerIndex;
    var interfaceLanguage = this.request.body.interfaceLanguage;


    var testSummary = yield (da.getTestSummaryById(testId));
    var testHandler = getTestHandlerById(testSummary.testType);

    //yield testHandler.submitAnswer(testId, questionId, userAnswerIndex);

    // var nextQuestion = yield testHandler.getNextQuestion(testId, interfaceLanguage); //return null if no next question


    // this.body = nextQuestion;

    yield next;

}

function* result(next) {
    var ctx = this;

    var testId = this.params.testId;
    var interfaceLanguage = this.params.interfaceLanguage;

    var testSummary = yield (da.getTestSummaryById(testId));
    var testHandler = getTestHandlerById(testSummary.testType);

    yield* (testHandler.result.call(ctx, this.params.testId, this.params.interfaceLanguage))

}

function* addMediumUrl(next) {

    var question = this.body;
    var testInfo = this.testInfo;
    const ABCD = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];

    if (!question) {
        return;
    }

    question.timeLimit = 30;

    if (question.Material.Medium && question.Material.Medium.MediumId) {
        question.Material.Medium.url = `https://s3-ap-southeast-1.amazonaws.com/${testInfo.testType.toLowerCase()}/${testInfo.discipline}/${testInfo.setId}/${question.Material.Medium.MediumId}.${question.Material.Medium.MediumType == 2 ? 'jpg' : 'ogg'}`;
    }


    if (question.QuestionText.Medium && question.QuestionText.Medium.MediumId) {
        question.QuestionText.Medium.url = `https://s3-ap-southeast-1.amazonaws.com/${testInfo.testType.toLowerCase()}/${testInfo.discipline}/${testInfo.setId}/${question.QuestionText.Medium.MediumId}.ogg`;
    }

    question.Answers.forEach(function (answer, index) {
        if (answer.Medium && answer.Medium.MediumId) {
            answer.Medium.url = `https://s3-ap-southeast-1.amazonaws.com/${testInfo.testType.toLowerCase()}/${testInfo.discipline}/${testInfo.setId}/${answer.Medium.MediumId}.ogg`;
            answer.Text = ABCD[index];
        }

    });



}

function getTestHandlerById(testType) {
    debug('entering test.getTestHandlerById with test type = %s', testType);

    // var testSummary = yield(da.getTestSummaryById(testId));
    switch (testType) {
        case 'PlacementTest':
            return placementTest;
        default:
            throw new error('test type not support');

    }
}