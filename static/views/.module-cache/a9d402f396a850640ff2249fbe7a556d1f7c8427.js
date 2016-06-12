/** @jsx React.DOM */

var React = require('react');
var ReactDOMServer = require('react-dom/server');


var run = React.createClass({displayName: "run",
    render: function () {
        return (
            React.createElement("html", null, 
                React.createElement("head", null, 
                    React.createElement("title", null, "Placement Test"), 
                    React.createElement("link", {rel: "stylesheet", type: "text/css", href: "../../../content/site.css"}), 
                    React.createElement("script", {type: "text/javascript", src: "http://ajax.aspnetcdn.com/ajax/jQuery/jquery-2.2.3.js"}), 
                    React.createElement("script", {type: "text/javascript", src: "../../../js/react.js"}), 
                    React.createElement("script", {type: "text/javascript", src: "../../../js/react-dom.js"}), 
                    React.createElement("script", {type: "text/javascript", src: "../../../js/browser.min.js"}), 
                    React.createElement("script", {type: "text/javascript", src: "../../../views/PlacementTest/run-client.js"})
                ), 
                React.createElement("body", null, 
                    React.createElement("input", {type: "hidden", id: "testId", value: this.props.testId}), 
                    React.createElement("input", {type: "hidden", id: "interfaceLanguage", value: this.props.interfaceLanguage}), 
                    React.createElement("div", {className: "wraper", id: "container"}, 
                        React.createElement("div", {id: "testContainer"}
                        )
                    )
                )
            )

        );
    }
});

module.exports = run;
