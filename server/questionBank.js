/**
 * Created by Simon on 2016/4/27.
 */
"use strict"

const connectionString = 'mongodb://localhost:27017/qb';
var MongoClient = require('mongodb').MongoClient;

Array.prototype.where = function (predict) {

    var result = [];

    this.forEach(el => {
        if (predict(el)) result.push(el);
    });

    return result;
};

function* getFirstStageOfPlacementTest(discipline, setId, version) {

    var collectionName = Array.of("PlacementTest", setId, discipline, version).join("_");

    var db = yield MongoClient.connect(connectionString);
    var collection = db.collection(collectionName);

    var questions = yield collection.find().toArray();
    db.close();

    var result = [];

    for (var i = 1; i <= 10; i++) {

        let grammarQuestions = questions.where(function (item) {
            return (item.Level == i && item.IsGrammarSkills);

        });

        var random = Math.floor(Math.random() * grammarQuestions.length);
        result.push(grammarQuestions[random]);

        let vocabularyQuestions = questions.where(function (item) {
            return (item.Level == i && item.IsGrammarSkills == false);
        });

        random = Math.floor(Math.random() * vocabularyQuestions.length);
        result.push(vocabularyQuestions[random]);

    }

    return result;
}

function* getSecondStageOfPlacementTest(discipline, setId, version, startLevel) {

    var collectionName = Array.of("PlacementTest", setId, discipline, version).join("_");

    var db = yield MongoClient.connect(connectionString);
    var collection = db.collection(collectionName);

    var questions = yield collection.find({ Level: { $gte: startLevel, $lt: startLevel + 5 } }).toArray();
    db.close();

    var result = [];

    for (var level = startLevel; level < startLevel + 5; level++) {

        //for each level add 2 grammar questions
        let grammarQuestions = questions.where(function (item) {
            return (item.Level == level && item.IsGrammarSkills)
        });
        var random = Math.floor(Math.random() * grammarQuestions.length);
        result.push(grammarQuestions.slice(random, random + 1)[0]);
        random = Math.floor(Math.random() * grammarQuestions.length);
        result.push(grammarQuestions.slice(random, random + 1)[0]);

        //and add 2 vocabulary questions
        let vocabularyQuestions = questions.where(function (item) {
            return (item.Level == level && item.IsGrammarSkills == false);
        });

        random = Math.floor(Math.random() * vocabularyQuestions.length);
        result.push(vocabularyQuestions.slice(random, random + 1)[0]);
        random = Math.floor(Math.random() * vocabularyQuestions.length);
        result.push(vocabularyQuestions.slice(random, random + 1)[0]);

    }

    return result;

}

function* getThirdStageOfPlacementTest(discipline, setId, version, startLevel) {

    var collectionName = Array.of("PlacementTest", setId, discipline, version).join("_");

    var db = yield MongoClient.connect(connectionString);
    var collection = db.collection(collectionName);

    var questions = yield collection.find({ Level: { $gte: startLevel, $lt: startLevel + 3 } }).toArray();
    db.close();

    var result = [];

    for (var level = startLevel; level < startLevel + 3; level++) {
        //for each level add 4 grammar questions
        let grammarQuestions = questions.where(function (item) {
            return (item.Level == level && item.IsGrammarSkills)
        });

        let random;

        for (let i = 0; i < 4; i++) {
            random = Math.floor(Math.random() * grammarQuestions.length);
            result.push(grammarQuestions.slice(random, random + 1)[0]);
        }

        //and add 4 vocabulary questions
        let vocabularyQuestions = questions.where(function (item) {
            return (item.Level == level && item.IsGrammarSkills == false);
        });
        for (let i = 0; i < 4; i++) {
            random = Math.floor(Math.random() * vocabularyQuestions.length);
            result.push(vocabularyQuestions.slice(random, random + 1)[0]);
        }
    }

    return result;
}

function* getDebugQuestion(questionType) {

    var collectionName = Array.of("PlacementTest", '01', 'ENGLISH', '1').join("_");

    var db = yield MongoClient.connect(connectionString);
    var collection = db.collection(collectionName);

    var question = yield collection.find({ QuestionType: questionType }).limit(1).next();

    return question;

}

module.exports = {
    getFirstStageOfPlacementTest,
    getSecondStageOfPlacementTest,
    getThirdStageOfPlacementTest,
    getDebugQuestion
};