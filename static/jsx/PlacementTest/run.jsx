/** @jsx React.DOM */

var React = require('react');
var ReactDOMServer = require('react-dom/server');


var run = React.createClass({
    render: function () {
        return (
            <html>
                <head>
                    <title>Placement Test</title>
                    <link rel="stylesheet" type="text/css" href="../../../content/site.css"/>
                    <script type="text/javascript" src="http://ajax.aspnetcdn.com/ajax/jQuery/jquery-2.2.3.js"/>
                    <script type="text/javascript" src="../../../js/react.js"/>
                    <script type="text/javascript" src="../../../js/react-dom.js"/>
                    <script type="text/javascript" src="../../../js/browser.min.js"/>
                    <script type="text/javascript" src="../../../views/PlacementTest/run-client.js"/>
                </head>
                <body>
                    <input type="hidden" id="testId" value={this.props.testId} />
                    <input type="hidden" id="interfaceLanguage" value={this.props.interfaceLanguage} />
                    <input type="hidden" id="textNext" value={this.props.textNext} />
                    <div className="wraper" id="container">
                        <div id="testContainer">
                        </div>
                    </div>
                </body>
            </html>

        );
    }
});

module.exports = run;
