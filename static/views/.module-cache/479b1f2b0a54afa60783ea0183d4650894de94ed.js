/** @jsx React.DOM */

var React = require('react');
var ReactDOMServer = require('react-dom/server');

var run = React.createClass({displayName: "run",
    render: function () {
        return (
            React.createElement("html", null, 
               "this is the run page of placement test"
            )

        );
    }
});
