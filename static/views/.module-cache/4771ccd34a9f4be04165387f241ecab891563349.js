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
                React.createElement("welcomeHeader", {stringResource: this.props.stringResource}), 
                React.createElement("span", null, "this is the welcome page of test ", this.props.testId)
            )
            )

        );
    }
});


var welcomeHeader = React.createClass({displayName: "welcomeHeader",
    render : function(){
        return(
            React.createElement("div", {class: "topImage"}, 
                React.createElement("div", {class: "mask"}, 
                    React.createElement("div", {class: "firstTitle"}, this.props.stringResource.STR_LEVEL_TEST), 
                    React.createElement("div", {class: "secondTitle"}, this.props.stringResource.STR_SECONDARY_NAVIGATION_PLACEMENT_TEST_DESCRIPTION_ONLINE), 
                    React.createElement("ul", null, 
                        React.createElement("li", null, this.props.stringResource.STR_LEVELS_ACTIVATION_TEST_MODE_BLOC_TEXT)
                    )
                )
            )
        );
    }
});

module.exports = welcome;
