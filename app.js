var koa = require('koa');
var app = koa();
var route = require('./server/route.js');
var bodyParser = require('koa-bodyparser');
var react = require('koa-react-view');
var path = require('path');

app.use(bodyParser());

route(app);
// app.use(function *(){
// 	this.body = "hello world";
// });

var viewPath = path.join(__dirname, 'static/views');
react(app, {
    views: viewPath,
    extname : 'js'
});

app.on('error', function(err,ctx){
    if (process.env.NODE_ENV != 'test') {
        console.log(err.message);
        console.log(err);
    }
});

console.log('start app server');
app.listen(3000);