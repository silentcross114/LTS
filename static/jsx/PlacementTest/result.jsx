/** @jsx React.DOM */

var React = require('react');

var result = React.createClass({

    render: function () {

        return (
            <html>
                <head>
                    <title>Placement Test</title>
                    <link rel="stylesheet" type="text/css" href="../../../content/site.css"/>
                </head>
                <body>
                    <div className="wraper">
                        <div className="topImage">
                            <div className="mask">
                                <div className="firstTitle">
                                    {this.props.STR_LEVEL_TEST}
                                </div>
                                <div className="secondTitle">
                                    {this.props.STR_SECONDARY_NAVIGATION_PLACEMENT_TEST_DESCRIPTION_ONLINE}
                                </div>
                                <ul>
                                    <li>{this.props.STR_LEVELS_ACTIVATION_TEST_MODE_BLOC_TEXT}</li>
                                </ul>
                            </div>
                        </div>

                        <div className="contentArea">
                            <div className="informationArea">
                                <div className="text">
                                    {this.props.STR_V10TEST_PLACEMENT_TEST_ENDED_TITLE}
                                </div>
                                <div className="stepOne">
                                    {this.props.STR_V10TEST_RESULT_TITLE}
                                </div>
                                <ul>
                                    <li> {this.props.Level}</li>
                                    <li> {this.props.VocaGramBalance}</li>
                                    <li> {this.props.WritingListeningBalance}</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </body>
            </html>

        );
    }
});

module.exports = result;