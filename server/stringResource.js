/**
 * Created by Simon on 2016/4/25.
 */
"use strict";

var config = require("./config.js");
var path = require("path");
var xmldoc = require("xmldoc");
var fs = require("fs");

module.exports = {getStringDictionary};

var cache = new Map();

function getStringDictionary(interfaceLanguage) {

    var stringRootDir = config.stringResource;
    var stringFile = path.join(stringRootDir, interfaceLanguage, "global.xml");

    if (cache.has(interfaceLanguage)) {

        let promise = new Promise(function (resolve, reject) {
            resolve(cache.get(interfaceLanguage));
        });

        return promise;
    }
    else {

        let promise = new Promise(function (resolve, reject) {

            fs.readFile(stringFile, {encoding : "utf8"}, function(err, data){

                if(err){
                    reject(err);
                    return;
                }

                var document = new xmldoc.XmlDocument(data);
                var result = {};

                for(let elem of document.childrenNamed("element")){
                    result[elem.attr.name] = elem.attr.value;
                }

                cache.set(interfaceLanguage, result);

                resolve(result);

            });

        });

        return promise;

    }

}