var router = require('koa-router')();
var serve = require('koa-static');
var path = require('path');
var startController = require('./start.js');
var testController = require('./test.js');

module.exports = function(app) {
    //setting static files route

    app.use(serve(path.normalize(__dirname + '/../static')));

    //setting default entrance
    router.redirect('/', '/html/start.html');

    router.post('/start', startController.start);

    router.get('/test/welcome/:testId/:interfaceLanguage', testController.welcome);
    
    //start test before each run
    router.get('/test/run/:testId/:interfaceLanguage', testController.startTest);    
    router.get('/test/run/:testId/:interfaceLanguage', testController.run);


    //submit answer
    router.all('/test/submitAnswer', testController.submitAnswer);
    router.all('/test/submitAnswer', testController.getNextQuestion);
    router.all('/test/submitAnswer', testController.addMediumUrl);

    router.all('/test/result/:testId/:interfaceLanguage', testController.result);
    
    //get next question
    router.post('/test/getNextQuestion', testController.getNextQuestion);
    router.post('/test/getNextQuestion', testController.addMediumUrl);
    
    
    router.all('test/startTest/:testId', testController.startTest);
    router.all('test/startTest/:testId', testController.getNextQuestion);

    app.use(router.routes());
}