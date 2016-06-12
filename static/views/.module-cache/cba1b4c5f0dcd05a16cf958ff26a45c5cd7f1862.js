/** @jsx React.DOM */

var React = require('react');
var ReactDOMServer = require('react-dom/server');

var welcome = React.createClass({displayName: "welcome",
    render: function () {
        var welcomeBody;

        if (this.props.started) {
            welcomeBody = React.createElement(WelcomeContinue, {stringResource: this.props.stringResource});
        }
        else {
            welcomeBody = React.createElement(WelcomeNewTest, {stringResource: this.props.stringResource});
        }

        return (
            React.createElement("html", null, 
            React.createElement("head", null, 
                React.createElement("title", null, "Placement Test"), 
                React.createElement("link", {rel: "stylesheet", type: "text/css", href: "../../../content/site.css"}), 
                React.createElement("script", {type: "text/javascript", src: "http://ajax.aspnetcdn.com/ajax/jQuery/jquery-2.2.3.js"}), 
                React.createElement("script", {type: "text/javascript", src: "../../../js/react.js"}), 
                React.createElement("script", {type: "text/javascript", src: "../../../js/placementtest.js"})
            ), 
            React.createElement("body", null, 
            React.createElement("div", {className: "wraper"}, 
                React.createElement(WelcomeHeader, {stringResource: this.props.stringResource}), 

                welcomeBody
            )
            )
            )

        );
    }
});


var WelcomeHeader = React.createClass({displayName: "WelcomeHeader",
    render: function () {
        return (
            React.createElement("div", {className: "topImage"}, 
                React.createElement("div", {className: "mask"}, 
                    React.createElement("div", {className: "firstTitle"}, this.props.stringResource.STR_LEVEL_TEST), 
                    React.createElement("div", {
                        className: "secondTitle"}, this.props.stringResource.STR_SECONDARY_NAVIGATION_PLACEMENT_TEST_DESCRIPTION_ONLINE), 
                    React.createElement("ul", null, 
                        React.createElement("li", null, this.props.stringResource.STR_LEVELS_ACTIVATION_TEST_MODE_BLOC_TEXT)
                    )
                )
            )
        );
    }
});

var WelcomeNewTest = React.createClass({displayName: "WelcomeNewTest",
        render: function () {
            return (
                React.createElement("div", {className: "contentArea"}, 
                    React.createElement("div", {className: "informationArea"}, 
                        React.createElement("div", {className: "text"}, 
                            this.props.STR_UNIDENTIFIED_HOME_WELCOME_TITLE
                        ), 
                        this.props.stringResource.STR_V10TEST_PLACEMENT_TEST_INTRO, " ", React.createElement("br", null), 
                        this.props.stringResource.STR_V10TEST_INTRO_CONDITION_AND_EVALUATION, 
                        React.createElement("ul", null, 
                            React.createElement("li", null, this.props.stringResource.STR_V10TEST_INTRO_VOCA_GRAMMAR_SKILL), 
                            React.createElement("li", null, this.props.stringResource.STR_V10TEST_INTRO_ORAL_WRITTEN_SKILL)
                        ), 
                        React.createElement("div", {className: "stepThree"}, 
                            this.props.stringResource.STR_V10TEST_ARE_YOU_READY_TITLE
                        ), 
                        React.createElement("div", {className: "textInforArea"}, 
                            this.props.stringResource.STR_V10TEST_ARE_YOU_READY_DESC
                        ), 

                        React.createElement("div", {id: "btnStart", className: "buttonArea"}, React.createElement("a", {
                            className: "button"}, React.createElement("span", null, this.props.stringResource.STR_LAUNCH_PROGRESSION_TEST))
                        ), 
                        React.createElement("div", {className: "stepOne"}, 
                            this.props.stringResource.STR_V10TEST_DURATION_TITLE
                        ), 
                        React.createElement("div", {className: "textInforArea"}, 
                            this.props.stringResource.STR_V10TEST_DURATION_DESC, " ", React.createElement("br", null), 
                            this.props.stringResource.STR_V10TEST_DURATION_DESC_ASTERIX
                        ), 
                        React.createElement("div", {className: "stepTwo"}, 
                            this.props.stringResource.STR_V10TEST_TAKING_TEST_CONDITION_TITLE
                        ), 
                        React.createElement("ul", null, 
                            React.createElement("li", null, this.props.stringResource.STR_V10TEST_TAKING_TEST_CONDITION_1), 
                            React.createElement("li", null, this.props.stringResource.STR_V10TEST_TAKING_TEST_CONDITION_2), 
                            React.createElement("li", null, this.props.stringResource.STR_V10TEST_TAKING_TEST_CONDITION_3), 
                            React.createElement("li", null, this.props.stringResource.STR_V10TEST_TAKING_TEST_CONDITION_4), 
                            React.createElement("li", null, this.props.stringResource.STR_V10TEST_TAKING_TEST_CONDITION_6)
                        ), 
                        React.createElement("div", {className: "stepThree"}, 
                            this.props.stringResource.STR_V10TEST_NOTE_TITLE
                        ), 
                        React.createElement("ul", null, 
                            React.createElement("li", null, this.props.stringResource.STR_V10TEST_NOTE_1), 
                            React.createElement("li", null, this.props.stringResource.STR_V10TEST_NOTE_2), 
                            React.createElement("li", null, this.props.stringResource.STR_V10TEST_NOTE_3)
                        )

                    )
                )
            );
        }
    }
);

var WelcomeContinue = React.createClass({displayName: "WelcomeContinue",
    render: function () {
        return (
            React.createElement("div", {className: "contentArea"}, 
                React.createElement("div", {className: "informationArea"}, 
                    React.createElement("div", {className: "text"}, 
                        this.props.stringResource.STR_V10TEST_PLACEMENT_TEST_PAUSED_TITLE
                    ), 
                    React.createElement("div", {className: "textInforArea"}, 
                        this.props.stringResource.STR_V10TEST_PLACEMENT_TEST_PAUSED_TITLE_DESC
                    ), 
                    React.createElement("div", {className: "stepThree"}, 
                        this.props.stringResource.STR_V10TEST_ARE_YOU_READY_TITLE
                    ), 
                    React.createElement("div", {className: "textInforArea"}, 
                        this.props.stringResource.STR_V10TEST_ARE_YOU_READY_DESC_CONTINUE
                    ), 

                    React.createElement("div", {id: "btnStart", className: "buttonArea"}, React.createElement("a", {
                        className: "button"}, React.createElement("span", null, this.props.stringResource.STR_CONTINUE_TEST))), 

                    React.createElement("div", {className: "stepOne"}, 
                        this.props.stringResource.STR_V10TEST_NOTE_TITLE
                    ), 

                    React.createElement("ul", null, 
                        React.createElement("li", null, this.props.stringResource.STR_V10TEST_NOTE_1), 
                        React.createElement("li", null, this.props.stringResource.STR_V10TEST_NOTE_2)
                    ), 

                    React.createElement("div", {className: "stepTwo"}, 
                        this.props.stringResource.STR_V10TEST_REVIEW_CONDITION_TITLE
                    ), 
                    React.createElement("ul", null, 
                        React.createElement("li", null, this.props.stringResource.STR_V10TEST_TAKING_TEST_CONDITION_1), 
                        React.createElement("li", null, this.props.stringResource.STR_V10TEST_TAKING_TEST_CONDITION_2), 
                        React.createElement("li", null, this.props.stringResource.STR_V10TEST_TAKING_TEST_CONDITION_3), 
                        React.createElement("li", null, this.props.stringResource.STR_V10TEST_TAKING_TEST_CONDITION_4), 
                        React.createElement("li", null, this.props.stringResource.STR_V10TEST_TAKING_TEST_CONDITION_6)
                    )
                )
            )
        );
    }
});


module.exports = welcome;
