/** @jsx React.DOM */

var React = require('react');

var result = React.createClass({displayName: "result",

    render: function () {

        return (
            React.createElement("html", null, 
                React.createElement("head", null, 
                    React.createElement("title", null, "Placement Test"), 
                    React.createElement("link", {rel: "stylesheet", type: "text/css", href: "../../../content/site.css"})
                ), 
                React.createElement("body", null, 
                    React.createElement("div", {className: "wraper"}, 
                        React.createElement("div", {className: "topImage"}, 
                            React.createElement("div", {className: "mask"}, 
                                React.createElement("div", {className: "firstTitle"}, 
                                    this.props.STR_LEVEL_TEST
                                ), 
                                React.createElement("div", {className: "secondTitle"}, 
                                    this.props.STR_SECONDARY_NAVIGATION_PLACEMENT_TEST_DESCRIPTION_ONLINE
                                ), 
                                React.createElement("ul", null, 
                                    React.createElement("li", null, this.props.STR_LEVELS_ACTIVATION_TEST_MODE_BLOC_TEXT)
                                )
                            )
                        ), 

                        React.createElement("div", {className: "contentArea"}, 
                            React.createElement("div", {className: "informationArea"}, 
                                React.createElement("div", {className: "text"}, 
                                    this.props.STR_V10TEST_PLACEMENT_TEST_ENDED_TITLE
                                ), 
                                React.createElement("div", {className: "stepOne"}, 
                                    this.props.STR_V10TEST_RESULT_TITLE
                                ), 
                                React.createElement("ul", null, 
                                    React.createElement("li", null, " ", this.props.Level), 
                                    React.createElement("li", null, " ", this.props.VocaGramBalance), 
                                    React.createElement("li", null, " ", this.props.WritingListeningBalance)
                                )
                            )
                        )
                    )
                )
            )

        );
    }
});