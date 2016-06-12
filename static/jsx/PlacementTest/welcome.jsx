/** @jsx React.DOM */

var React = require('react');
var ReactDOMServer = require('react-dom/server');

var welcome = React.createClass({
    render: function () {
        var welcomeBody;

        if (this.props.started) {
            welcomeBody = <WelcomeContinue stringResource={this.props.stringResource}></WelcomeContinue>;
        }
        else {
            welcomeBody = <WelcomeNewTest stringResource={this.props.stringResource} ></WelcomeNewTest>;
        }

        return (
            <html>
            <head>
                <title>Placement Test</title>
                <link rel="stylesheet" type="text/css" href="../../../content/site.css"/>
                <script type="text/javascript" src="http://ajax.aspnetcdn.com/ajax/jQuery/jquery-2.2.3.js"/>
                <script type="text/javascript" src="../../../js/react.js"/>   
                <script type="text/javascript" src="../../../js/placementTest/welcome.js"/>              
            </head>
            <body>
            <input type="hidden" id="testId" value={this.props.testId} />
            <input type="hidden" id="interfaceLanguage" value={this.props.interfaceLanguage} />
            <div className="wraper">
                <WelcomeHeader stringResource={this.props.stringResource}></WelcomeHeader>

                {welcomeBody}
            </div>
            </body>            
            </html>

        );
    }
    
});


var WelcomeHeader = React.createClass({
    render: function () {
        return (
            <div className="topImage">
                <div className="mask">
                    <div className="firstTitle">{this.props.stringResource.STR_LEVEL_TEST}</div>
                    <div
                        className="secondTitle">{this.props.stringResource.STR_SECONDARY_NAVIGATION_PLACEMENT_TEST_DESCRIPTION_ONLINE}</div>
                    <ul>
                        <li>{this.props.stringResource.STR_LEVELS_ACTIVATION_TEST_MODE_BLOC_TEXT}</li>
                    </ul>
                </div>
            </div>
        );
    }
});

var WelcomeNewTest = React.createClass({
        render: function () {
            return (
                <div className="contentArea">
                    <div className="informationArea">
                        <div className="text">
                            {this.props.STR_UNIDENTIFIED_HOME_WELCOME_TITLE}
                        </div>
                        {this.props.stringResource.STR_V10TEST_PLACEMENT_TEST_INTRO} <br />
                        {this.props.stringResource.STR_V10TEST_INTRO_CONDITION_AND_EVALUATION}
                        <ul>
                            <li>{this.props.stringResource.STR_V10TEST_INTRO_VOCA_GRAMMAR_SKILL}</li>
                            <li>{this.props.stringResource.STR_V10TEST_INTRO_ORAL_WRITTEN_SKILL}</li>
                        </ul>
                        <div className="stepThree">
                            {this.props.stringResource.STR_V10TEST_ARE_YOU_READY_TITLE}
                        </div>
                        <div className="textInforArea">
                            {this.props.stringResource.STR_V10TEST_ARE_YOU_READY_DESC}
                        </div>

                        <div id="btnStart" className="buttonArea" ><a
                            className="button"><span>{this.props.stringResource.STR_LAUNCH_PROGRESSION_TEST}</span></a>
                        </div>
                        <div className="stepOne">
                            {this.props.stringResource.STR_V10TEST_DURATION_TITLE}
                        </div>
                        <div className="textInforArea">
                            {this.props.stringResource.STR_V10TEST_DURATION_DESC} <br />
                            {this.props.stringResource.STR_V10TEST_DURATION_DESC_ASTERIX}
                        </div>
                        <div className="stepTwo">
                            {this.props.stringResource.STR_V10TEST_TAKING_TEST_CONDITION_TITLE}
                        </div>
                        <ul>
                            <li>{this.props.stringResource.STR_V10TEST_TAKING_TEST_CONDITION_1}</li>
                            <li>{this.props.stringResource.STR_V10TEST_TAKING_TEST_CONDITION_2}</li>
                            <li>{this.props.stringResource.STR_V10TEST_TAKING_TEST_CONDITION_3}</li>
                            <li>{this.props.stringResource.STR_V10TEST_TAKING_TEST_CONDITION_4}</li>
                            <li>{this.props.stringResource.STR_V10TEST_TAKING_TEST_CONDITION_6}</li>
                        </ul>
                        <div className="stepThree">
                            {this.props.stringResource.STR_V10TEST_NOTE_TITLE}
                        </div>
                        <ul>
                            <li>{this.props.stringResource.STR_V10TEST_NOTE_1}</li>
                            <li>{this.props.stringResource.STR_V10TEST_NOTE_2}</li>
                            <li>{this.props.stringResource.STR_V10TEST_NOTE_3}</li>
                        </ul>

                    </div>
                </div>
            );
        }
    }
);

var WelcomeContinue = React.createClass({
    render: function () {
        return (
            <div className="contentArea">
                <div className="informationArea">
                    <div className="text">
                        {this.props.stringResource.STR_V10TEST_PLACEMENT_TEST_PAUSED_TITLE}
                    </div>
                    <div className="textInforArea">
                        {this.props.stringResource.STR_V10TEST_PLACEMENT_TEST_PAUSED_TITLE_DESC}
                    </div>
                    <div className="stepThree">
                        {this.props.stringResource.STR_V10TEST_ARE_YOU_READY_TITLE}
                    </div>
                    <div className="textInforArea">
                        {this.props.stringResource.STR_V10TEST_ARE_YOU_READY_DESC_CONTINUE}
                    </div>

                    <div id="btnStart" className="buttonArea"><a
                        className="button"><span>{this.props.stringResource.STR_CONTINUE_TEST}</span></a></div>

                    <div className="stepOne">
                        {this.props.stringResource.STR_V10TEST_NOTE_TITLE}
                    </div>

                    <ul>
                        <li>{this.props.stringResource.STR_V10TEST_NOTE_1}</li>
                        <li>{this.props.stringResource.STR_V10TEST_NOTE_2}</li>
                    </ul>

                    <div className="stepTwo">
                        {this.props.stringResource.STR_V10TEST_REVIEW_CONDITION_TITLE}
                    </div>
                    <ul>
                        <li>{this.props.stringResource.STR_V10TEST_TAKING_TEST_CONDITION_1}</li>
                        <li>{this.props.stringResource.STR_V10TEST_TAKING_TEST_CONDITION_2}</li>
                        <li>{this.props.stringResource.STR_V10TEST_TAKING_TEST_CONDITION_3}</li>
                        <li>{this.props.stringResource.STR_V10TEST_TAKING_TEST_CONDITION_4}</li>
                        <li>{this.props.stringResource.STR_V10TEST_TAKING_TEST_CONDITION_6}</li>
                    </ul>
                </div>
            </div>
        );
    }
});


module.exports = welcome;
