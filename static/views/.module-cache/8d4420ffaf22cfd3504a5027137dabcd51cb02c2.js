// /** @jsx React.DOM */

// var React = require('react');
// var ReactDOMServer = require('react-dom/server');

window.onload = function () {

  var BtnSubmit = React.createClass({displayName: "BtnSubmit",
    render: function () {

      return (React.createElement("div", {onClick: this.props.onSubmit}, "Next"))
    }
  });

  //question instruction 
  var Instruction = React.createClass({displayName: "Instruction",
    render: function () {
      return (
        React.createElement("div", {className: "topType"}, 
          React.createElement("span", {className: "typeTypeTxt"}, this.props.questionNumber), 
          this.props.instruction
        )
      );
    }
  });

  //countdown timer
  var Timer = React.createClass({displayName: "Timer",
    render: function () {
      return (React.createElement("div", {className: "topRemainTime"}, "00: 30"))
    }
  });

  // Header of question, contains instruction and countdown timer
  var Header = React.createClass({displayName: "Header",
    render: function () {

      return (
        React.createElement("div", {className: "topArea"}, 
          React.createElement(Instruction, {questionNumber: "1", instruction: "test instruction"}), 
          React.createElement(Timer, null)
        )
      );
    }
  });


  var Question = React.createClass({displayName: "Question",
    getInitialState: function () {
      this.moveToNextQuestion();

      return null;
    },
    render: function () {

      return (
        React.createElement("div", null, 
          React.createElement("div", null, JSON.stringify(this.state) ), 
          React.createElement(Header, null), 
          React.createElement(BtnSubmit, {onSubmit: this.submitAnswer})
        ));

    },
    moveToNextQuestion: function () {
      var self = this;

      //get next question data
      var testId = $('#testId').val();
      var interfaceLanguage = $('#interfaceLanguage').val();

      var url = 'http://localhost:3000/test/getNextQuestion'
      $.post(url, { testId: testId, interfaceLanguage : interfaceLanguage }).done(function (data) {
        if (data) {
          self.setState(data);
        }
        else {
          // window.location = 'http://localhost:3000/test/result/' + testId +'/' + interfaceLanguage;
          window.location = `http://localhost:3000/test/result/${testId}/${interfaceLanguage}`;
        }
      });

    },
    submitAnswer: function () {
      var self = this;
      var testId = $('#testId').val();
      var interfaceLanguage = $('#interfaceLanguage').val();
      var questionId = this.state.QuestionId;
      var url = 'http://localhost:3000/test/submitAnswer'

      $.post(url, { testId: testId, questionId: questionId, userAnswerIndex: 0, interfaceLanguage : interfaceLanguage }).done(function (data) {
        if (data) {
          self.setState(data);
        }
        else {
          window.location = `http://localhost:3000/test/result/${testId}/${interfaceLanguage}`;
        }
      });

    }

  });


  ReactDOM.render(
    React.createElement(Question, null),
    document.getElementById('testContainer')
  );


};


