/**
 * Created by Simon on 2016/4/25.
 */

var target = require("../server/stringResource.js");

target.getStringDictionary("en-US").then(function(data){

    console.log(JSON.stringify(data));
});

target.getStringDictionary("en-US").then(function(data){

    console.log(JSON.stringify(data));
});