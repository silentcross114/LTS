/**
 * Created by Simon on 2016/4/11.
 */
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
var debug = require('debug')('Debug dataAccess.js');
var EnumAndConst = require('./EnumAndConst.js');
var assert = require('assert');

module.exports = {
    getTestInstanceId,
    addTest,
    getTestSummaryById,
    getTestDocument,
    startTest,
    updateDocument,
    finishTest
};

/**
 * Get test instance id by parameters
 * 
 * test parameters consist of 6 elements, user id, test type, discipline, set id, session id and server id.
 */
function* getTestInstanceId(testParameters) {

    debug('Entering getTestInstanceId. args = %s', JSON.stringify(testParameters));

    var db = yield MongoClient.connect(EnumAndConst.ConnectionString);
    var testsCollection = db.collection(EnumAndConst.TestsCollectionName);
    var doc = yield testsCollection.find({
        userId: testParameters.userId,
        testType: testParameters.testType,
        discipline: testParameters.discipline,
        setId: testParameters.setId,
        sessionId: testParameters.sessionId,
        serverId: testParameters.serverId
    }).limit(1).next();

    db.close();

    if (doc)
        return doc._id;
    else
        return null;
}

/**
 * Create a new test instance
 */
function* addTest(testParameters) {

    var db = yield MongoClient.connect(EnumAndConst.ConnectionString);
    var testsCollection = db.collection(EnumAndConst.TestsCollectionName);

    var count = yield testsCollection.count({
        userId: testParameters.userId,
        testType: testParameters.testType,
        discipline: testParameters.discipline,
        setId: testParameters.setId,
        sessionId: testParameters.sessionId,
        serverId: testParameters.serverId
    });

    if (count > 1) throw new Error('Test Instance already exists.');

    var args = {
        status : 0
    };

    Object.assign(args, testParameters);

    var insertResult = yield testsCollection.insertOne(args);

    db.close();

    return insertResult.insertedId;
}

/**
 * Get test summary by test instance id
 */
function* getTestSummaryById(testId) {

    var objectId;

    try {
        objectId = new ObjectId(testId);
    }
    catch (ex) {
        return null;
    }

    var db = yield MongoClient.connect(EnumAndConst.ConnectionString);
    var doc = yield db.collection(EnumAndConst.TestsCollectionName)
        .find({ '_id': objectId })
        .limit(1)
        .next();

    db.close();

    return doc;
    // if (doc) {
    //     return {
    //         testId: doc._id,
    //         userId: doc.userId,
    //         testType: doc.testType,
    //         discipline: doc.discipline,
    //         setId: doc.setId,
    //         sessionId: doc.sessionId,
    //         serverId: doc.serverId,
    //         status: doc.status
    //     };
    // }
    // else {
    //     return null;
    // }

}

/**
 * Get test document by id. Test document stores the information of questions this test instance, and user's answer of each question.
 */
function* getTestDocument(testId) {

    var db = yield MongoClient.connect(EnumAndConst.ConnectionString);
    var collection = db.collection(EnumAndConst.TestDocumentCollectionName);
    var doc = yield collection.find({ testId: testId }).limit(1).next();

    if (doc) {
        db.close();
        return doc;

    } else {
        var testDocument = {
            testId: testId,
            questions: [],
            position: 0,
            lastAccess: Date.now()

        }

        collection.insertOne(testDocument, function () {
            db.close();
        });

        return testDocument;
    }
}

/**
 * Start a test instance
 */
function* startTest(testId) {
    var db = yield MongoClient.connect(EnumAndConst.ConnectionString);

    var testsCollection = db.collection(EnumAndConst.TestsCollectionName);
    var documentCollection = db.collection(EnumAndConst.TestDocumentCollectionName);

    yield testsCollection.findOneAndUpdate(
        { '_id': new ObjectId(testId), status: EnumAndConst.TestStatus.NotStarted },
        { $set: { status: EnumAndConst.TestStatus.OnProgress } },
        {});

    var testDocument = yield documentCollection.findOne({ testId: testId }, {});

    if (!testDocument) {
        testDocument = {
            testId: testId,
            position: 0,
            questions: [],
            lastAccess: Date.now()
        };

        yield documentCollection.insertOne(testDocument, {});
    }

    db.close();

    return testDocument;

}

/**
 * Finish a test instance, save the scores
 */
function* finishTest(testId, grade, oralScore, writtenScore) {
    var db = yield MongoClient.connect(EnumAndConst.ConnectionString);

    var testsCollection = db.collection(EnumAndConst.TestsCollectionName);

    yield testsCollection.updateOne({ '_id': new ObjectId(testId) },
        {
            $set: {
                status: EnumAndConst.TestStatus.Finished,
                grade: grade,
                oralScore: oralScore,
                writtenScore: writtenScore
            }
        },
        { upsert: true });

}

/**
 * Update the test document
 */
function* updateDocument(testDocument) {

    var db = yield MongoClient.connect(EnumAndConst.ConnectionString);
    db.collection(EnumAndConst.TestDocumentCollectionName)
        .findOneAndReplace({ testId: testDocument.testId }, testDocument, { returnOriginal: false });


}