/** @jsx React.DOM */

var React = require('react');
var ReactDOMServer = require('react-dom/server');

var welcome = React.createClass({displayName: "welcome",
    render : function(){
        return (
            React.createElement("html", null, 
                React.createElement("head", null, 
                    React.createElement("title", null, "Placement Test"), 
                    React.createElement("link", {rel: "stylesheet", type: "text/css", href: "../../../content/site.css"})
                ), 
            React.createElement("body", null, 
                React.createElement(WelcomeHeader, {stringResource: this.props.stringResource})
            )
            )

        );
    }
});


var WelcomeHeader = React.createClass({displayName: "WelcomeHeader",
    render : function(){
        return(
            React.createElement("div", {className: "topImage"}, 
                React.createElement("div", {className: "mask"}, 
                    React.createElement("div", {className: "firstTitle"}, this.props.stringResource.STR_LEVEL_TEST), 
                    React.createElement("div", {className: "secondTitle"}, this.props.stringResource.STR_SECONDARY_NAVIGATION_PLACEMENT_TEST_DESCRIPTION_ONLINE), 
                    React.createElement("ul", null, 
                        React.createElement("li", null, this.props.stringResource.STR_LEVELS_ACTIVATION_TEST_MODE_BLOC_TEXT)
                    )
                )
            )
        );
    }
});

module.exports = welcome;
