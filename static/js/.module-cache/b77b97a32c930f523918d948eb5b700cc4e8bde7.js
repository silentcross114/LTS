/** @jsx React.DOM */

var React = require('react');
var ReactDOMServer = require('react-dom/server');

var welcome = React.createClass({displayName: "welcome",
    render : function(){
        return React.createElement("span", null, "this is the placement test welcome page.");
    }
});

module.exports = welcome;
