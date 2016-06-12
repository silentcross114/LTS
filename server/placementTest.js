/**
 * Created by Simon on 2016/4/14.
 */
'use strict'

var debug = require('debug')('placement');
var da = require('./dataAccess.js');
var stringResource = require("./stringResource.js");
var questionBank = require("./questionBank.js");
var EnumAndConst = require('./EnumAndConst.js');

module.exports = {
    welcome,
    startTest,
    getNextQuestion,
    run,
    submitAnswer,
    result
};

function* welcome(testId, interfaceLanguage) {

    // this.body = 'welcome page of test ' + testId + ' interfaceLanguage : ' + this.params.interfaceLanguage;
    debug('welcome page');

    var testSummary = yield (da.getTestSummaryById(testId));

    var translations = yield (stringResource.getStringDictionary(interfaceLanguage));

    this.render('PlacementTest/welcome', {
        testId: testId,
        interfaceLanguage: interfaceLanguage,
        started: (testSummary.status != 0),
        stringResource: {
            STR_LEVEL_TEST: translations.STR_LEVEL_TEST,
            STR_SECONDARY_NAVIGATION_PLACEMENT_TEST_DESCRIPTION_ONLINE: translations.STR_SECONDARY_NAVIGATION_PLACEMENT_TEST_DESCRIPTION_ONLINE,
            STR_LEVELS_ACTIVATION_TEST_MODE_BLOC_TEXT: translations.STR_LEVELS_ACTIVATION_TEST_MODE_BLOC_TEXT,
            STR_UNIDENTIFIED_HOME_WELCOME_TITLE: translations.STR_UNIDENTIFIED_HOME_WELCOME_TITLE,
            STR_V10TEST_PLACEMENT_TEST_INTRO: translations.STR_V10TEST_PLACEMENT_TEST_INTRO,
            STR_V10TEST_INTRO_CONDITION_AND_EVALUATION: translations.STR_V10TEST_INTRO_CONDITION_AND_EVALUATION,
            STR_V10TEST_INTRO_VOCA_GRAMMAR_SKILL: translations.STR_V10TEST_INTRO_VOCA_GRAMMAR_SKILL,
            STR_V10TEST_INTRO_ORAL_WRITTEN_SKILL: translations.STR_V10TEST_INTRO_ORAL_WRITTEN_SKILL,
            STR_V10TEST_ARE_YOU_READY_TITLE: translations.STR_V10TEST_ARE_YOU_READY_TITLE,
            STR_V10TEST_ARE_YOU_READY_DESC: translations.STR_V10TEST_ARE_YOU_READY_DESC,
            STR_LAUNCH_PROGRESSION_TEST: translations.STR_LAUNCH_PROGRESSION_TEST,
            STR_V10TEST_DURATION_TITLE: translations.STR_V10TEST_DURATION_TITLE,
            STR_V10TEST_DURATION_DESC: translations.STR_V10TEST_DURATION_DESC,
            STR_V10TEST_DURATION_DESC_ASTERIX: translations.STR_V10TEST_DURATION_DESC_ASTERIX,
            STR_V10TEST_TAKING_TEST_CONDITION_TITLE: translations.STR_V10TEST_TAKING_TEST_CONDITION_TITLE,
            STR_V10TEST_TAKING_TEST_CONDITION_1: translations.STR_V10TEST_TAKING_TEST_CONDITION_1,
            STR_V10TEST_TAKING_TEST_CONDITION_2: translations.STR_V10TEST_TAKING_TEST_CONDITION_2,
            STR_V10TEST_TAKING_TEST_CONDITION_3: translations.STR_V10TEST_TAKING_TEST_CONDITION_3,
            STR_V10TEST_TAKING_TEST_CONDITION_4: translations.STR_V10TEST_TAKING_TEST_CONDITION_4,
            STR_V10TEST_TAKING_TEST_CONDITION_6: translations.STR_V10TEST_TAKING_TEST_CONDITION_6,
            STR_V10TEST_NOTE_TITLE: translations.STR_V10TEST_NOTE_TITLE,
            STR_V10TEST_NOTE_1: translations.STR_V10TEST_NOTE_1,
            STR_V10TEST_NOTE_2: translations.STR_V10TEST_NOTE_2,
            STR_V10TEST_NOTE_3: translations.STR_V10TEST_NOTE_3,
            STR_V10TEST_PLACEMENT_TEST_PAUSED_TITLE: translations.STR_V10TEST_PLACEMENT_TEST_PAUSED_TITLE,
            STR_V10TEST_PLACEMENT_TEST_PAUSED_TITLE_DESC: translations.STR_V10TEST_PLACEMENT_TEST_PAUSED_TITLE_DESC,
            STR_V10TEST_ARE_YOU_READY_DESC_CONTINUE: translations.STR_V10TEST_ARE_YOU_READY_DESC_CONTINUE,
            STR_CONTINUE_TEST: translations.STR_CONTINUE_TEST,
            STR_V10TEST_REVIEW_CONDITION_TITLE: translations.STR_V10TEST_REVIEW_CONDITION_TITLE
        }
    });

}

function *run(testId, interfaceLanguage) {

    var translations = yield (stringResource.getStringDictionary(interfaceLanguage));

    this.render('PlacementTest/run', {
        testId: testId,
        interfaceLanguage: interfaceLanguage,
        textNext : translations.STR_VALIDER
    });


}

function* startTest(testId, interfaceLanguage) {

    var testDocument = yield* (da.startTest(testId));
    if (testDocument.questions.length == 0) {
        //populate first stage
        var testSummary = yield (da.getTestSummaryById(testId));
        var firstStageQuestions = yield* (questionBank.getFirstStageOfPlacementTest(testSummary.discipline, testSummary.setId, 1));

        testDocument = addStage(testDocument, firstStageQuestions, 0);
        testDocument.status = EnumAndConst.TestStatus.InProgress;
        yield da.updateDocument(testDocument);
    }

}

function* getNextQuestion(testId, interfaceLanguage) {

    var testDocument = yield* (da.getTestDocument(testId));

    if (testDocument.position < testDocument.questions.length) {
        //this is question not displayed in this stage
        var result = testDocument.questions[testDocument.position];
        testDocument.position++;
        yield da.updateDocument(testDocument);

        result.questionNumber = testDocument.position;
        result.instructionText = yield getInstructionText(result.QuestionType, interfaceLanguage);
        return result;
    }
    else {
        if (testDocument.questions.length == 20) {
            //end of first stage, calculate current score, decide the start level of next stage
            // and populate next stage questions
            let score = 0;
            testDocument.questions.forEach(function (q) {
                if (q.userAnserIndex == -1) {
                    //question not answered, 0 point
                } else {
                    if (q.Answers[q.userAnserIndex].IsGoodAnswer) {
                        //correct answer
                        score += 3;
                    }
                    else {
                        //wrong answer
                        score -= 1;
                    }
                }
            });

            let stage1Level = Math.round((score > 3 ? score : 3) / 6);
            let stage2StartLevel = Math.min(Math.max(stage1Level - 2, 1), 6);
            let testSummary = yield (da.getTestSummaryById(testId));

            let stage2Questions = yield (questionBank.getSecondStageOfPlacementTest(testSummary.discipline, testSummary.setId, 1, stage2StartLevel));

            testDocument = addStage(testDocument, stage2Questions, 1);
            testDocument.stage2StartLevel = stage2StartLevel;

            let nextQuestion = testDocument.questions[testDocument.position];
            testDocument.position++;
            yield da.updateDocument(testDocument);
            nextQuestion.questionNumber = testDocument.position;
            nextQuestion.instructionText = yield getInstructionText(nextQuestion.QuestionType, interfaceLanguage);
            return nextQuestion;

        }
        else if (testDocument.questions.length == 40) {
            //end of second stage
            //calculate score of second stage, populate 3rd stage
            let score = 0;
            testDocument.questions.forEach(function (q) {
                if (q.stageNo != 1) return;
                if (q.userAnserIndex == -1) return;
                if (q.Answers[q.userAnserIndex].IsGoodAnswer) {
                    //correct answer
                    score += 3;
                }
                else {
                    //wrong answer
                    score -= 1;
                }
            });

            let stage2Level = testDocument.stage2StartLevel + Math.floor((Math.round(Math.max(score, 3) / 6) - 0.5) / 2);
            let stage3StartLevel = Math.min(Math.max(stage2Level - 1, 1), 8);
            let testSummary = yield (da.getTestSummaryById(testId));
            let stage3Questions = yield (questionBank.getThirdStageOfPlacementTest(testSummary.discipline, testSummary.setId, 1, stage3StartLevel));

            testDocument = addStage(testDocument, stage3Questions, 2);
            testDocument.stage3StartLevel = stage3StartLevel;

            let nextQuestion = testDocument.questions[testDocument.position];
            testDocument.position++;
            yield da.updateDocument(testDocument);
            nextQuestion.questionNumber = testDocument.position;
            nextQuestion.instructionText = yield getInstructionText(nextQuestion.QuestionType, interfaceLanguage);
            return nextQuestion;

        }
        else if (testDocument.questions.length == 64) {
            //end of test, all 3 stages finished
            let totalVocabularyAnswers = 0;
            let correctVocabularyAnswers = 0;
            let totalGrammarAnswers = 0;
            let correctGrammarAnswers = 0;
            let score = 0;

            testDocument.questions.forEach(function (q) {

                if (q.IsGrammarSkills) {
                    totalGrammarAnswers++;
                    if (q.userAnserIndex >= 0 && q.Answers[q.userAnserIndex].IsGoodAnswer) {
                        correctGrammarAnswers++;
                    }
                }
                else {
                    totalVocabularyAnswers++;
                    if (q.userAnserIndex >= 0 && q.Answers[q.userAnserIndex].IsGoodAnswer) {
                        correctVocabularyAnswers++;
                    }
                }

                //calculate score
                if (q.stageNo == 2) {
                    if (q.userAnserIndex < 0) {
                        //do nothing
                    }
                    else {
                        if (q.Answers[q.userAnserIndex].IsGoodAnswer) {
                            score += 3;
                        }
                        else {
                            score -= 1;
                        }
                    }
                }
            });

            let scoreOral = correctVocabularyAnswers / totalVocabularyAnswers * 5;
            let scoreWritten = correctGrammarAnswers / totalGrammarAnswers * 5;
            let grade = Math.round(testDocument.stage3StartLevel + Math.max(score / 36, 0), 1);
            yield da.finishTest(testId, grade, scoreOral, scoreWritten);

            return null;
        }
        else {
            assert.throw("unexpected question count.");
        }
    }
}


function* submitAnswer(testId, questionId, userAnswerIndex) {

    var testDocument = yield da.getTestDocument(testId);
    var question = testDocument.questions.find(q => q.QuestionId == questionId);
    question.userAnswerIndex = userAnswerIndex;
    yield da.updateDocument(testDocument);

}

function* result(testId, interfaceLanguage) {

    var summary = yield (da.getTestSummaryById(testId));
    var translations = yield (stringResource.getStringDictionary(interfaceLanguage));
    var localizedStrings =  {
            STR_LEVEL_TEST: translations.STR_LEVEL_TEST,
            STR_SECONDARY_NAVIGATION_PLACEMENT_TEST_DESCRIPTION_ONLINE: translations.STR_SECONDARY_NAVIGATION_PLACEMENT_TEST_DESCRIPTION_ONLINE,
            STR_LEVELS_ACTIVATION_TEST_MODE_BLOC_TEXT: translations.STR_LEVELS_ACTIVATION_TEST_MODE_BLOC_TEXT,
            STR_V10TEST_PLACEMENT_TEST_ENDED_TITLE: translations.STR_V10TEST_PLACEMENT_TEST_ENDED_TITLE,
            STR_V10TEST_RESULT_TITLE: translations.STR_V10TEST_RESULT_TITLE,
            Level : translations.STR_V10TEST_RESULTS_LEVEL.format(summary.fullName, summary.grade),
            VocaGramBalance : translations.STR_TP_LEVEL_1,
            WritingListeningBalance : translations.STR_TP_LEVEL_4
        };


    this.render('PlacementTest/result',
       localizedStrings
    );

}


function addStage(testDocument, questions, stageNo) {

    questions.forEach(function (question) {

        question.stageNo = stageNo;
        question.userAnserIndex = -1;
        question.Answers.shuffle();
        testDocument.questions.push(question);

    });

    return testDocument;
}

Array.prototype.shuffle = function () {

    for (var i = this.length; i > 0; i--) {
        var random = Math.floor(Math.random() * i);
        var tmp = this[i - 1];
        this[i - 1] = this[random];
        this[random] = tmp;
    }

    return this;
};

String.prototype.format = function()
{
    var args = arguments;
    return this.replace(/\{(\d+)\}/g,                
        function(m,i){
            return args[i];
        });
}


function* getInstructionText(qusetionType, interfaceLanguage) {

    var translations = yield (stringResource.getStringDictionary(interfaceLanguage));

    switch (qusetionType) {
        case EnumAndConst.QuestionType.PictureWQuestionWAnswers:
            return translations.STR_TP_CONSIGNE_01;
        case EnumAndConst.QuestionType.PictureOQuestionOAnswers:
            return translations.STR_TP_CONSIGNE_02;
        case EnumAndConst.QuestionType.PictureOQuestionWAnswers:
            return translations.STR_TP_CONSIGNE_01;
        case EnumAndConst.QuestionType.WTextWQuestionWAnswers:
            return translations.STR_TP_CONSIGNE_09;
        case EnumAndConst.QuestionType.OTextOQuestionOAnswers:
            return translations.STR_TP_CONSIGNE_11;
        case EnumAndConst.QuestionType.OTextOQuestionWAnswers:
            return translations.STR_TP_CONSIGNE_11;
        case EnumAndConst.QuestionType.OTextWQuestionWAnswers:
            return translations.STR_TP_CONSIGNE_12;
        case EnumAndConst.QuestionType.RightWordWQuestionWAnswers:
            return translations.STR_TP_CONSIGNE_03;
        case EnumAndConst.QuestionType.RightWordWQuestionOAnswers:
            return translations.STR_TP_CONSIGNE_04;
        case EnumAndConst.QuestionType.RightWordOQuestionOAnswers:
            return translations.STR_TP_CONSIGNE_05;
        case EnumAndConst.QuestionType.RightWordOQuestionWAnswers:
            return translations.STR_TP_CONSIGNE_05;
        case EnumAndConst.QuestionType.SynRightWordWQuestionWAnswers:
            return translations.STR_TP_CONSIGNE_03;
        case EnumAndConst.QuestionType.SynRightWordWQuestionOAnswers:
            return translations.STR_TP_CONSIGNE_04;
        case EnumAndConst.QuestionType.WordOrder:
            return translations.STR_TP_CONSIGNE_07;

        default:
            return '';
    }
}

