/** @jsx React.DOM */

var React = require('react');
var ReactDOMServer = require('react-dom/server');

var welcome = React.createClass({displayName: "welcome",
    render : function(){
        return (
            React.createElement("html", null, 
                React.createElement("head", null, 
                    React.createElement("title", null, "Placement Test")
                ), 
            React.createElement("body", null, 
                React.createElement("span", null, "this is the welcome page of test ", this.props.testId)
            )
            )

        );
    }
});

module.exports = welcome;
