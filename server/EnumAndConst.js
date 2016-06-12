/**
 * Created by Simon on 2016/4/28.
 */

module.exports = {
    ConnectionString : "mongodb://localhost:27017/lts",

    TestStatus : {
        NotStarted : 0,
        OnProgress : 1,
        Finished : 2
    },
    
    QuestionType :{
        PictureWQuestionWAnswers : 1,
        PictureOQuestionOAnswers : 2,
        PictureOQuestionWAnswers : 3,
        WTextWQuestionWAnswers : 4,
        OTextOQuestionOAnswers : 5,
        OTextOQuestionWAnswers : 6,
        OTextWQuestionWAnswers : 7,
        RightWordWQuestionWAnswers : 8,
        RightWordWQuestionOAnswers : 9,
        RightWordOQuestionOAnswers : 10,
        RightWordOQuestionWAnswers : 11,
        WordOrder : 12,
        WhatsWrong : 13,
        WordAssociation : 14,
        SynRightWordWQuestionWAnswers : 21,
        SynRightWordWQuestionOAnswers : 22

        
    },

    TestsCollectionName : "tests",
    TestDocumentCollectionName : "test_document"

};