// /** @jsx React.DOM */

// var React = require('react');
// var ReactDOMServer = require('react-dom/server');

window.onload = function () {

  var BtnSubmit = React.createClass({displayName: "BtnSubmit",
    render: function () {

      return (React.createElement("div", {onClick: this.props.onSubmit}, "Next"))
    }
  });

  var Question = React.createClass({displayName: "Question",
    getInitialState: function () {
      this.moveToNextQuestion();

      return { question: 'test question' };
    },
    render: function () {

      return (
        React.createElement("div", null, 
          React.createElement("div", null, JSON.stringify(this.state) ), 
          React.createElement(BtnSubmit, {onSubmit: this.submitAnswer})
        ));

    },
    moveToNextQuestion: function () {
      var self = this;

      //get next question data
      var testId = $('#testId').val();
      var url = 'http://localhost:3000/test/getNextQuestion'
      $.post(url, { testId: testId }).done(function (data) {
        self.setState(data);
      });

    },
    submitAnswer: function () {
      var self = this;
      var testId = $('#testId').val();
      var questionId = this.state.QuestionId;
      var url = 'http://localhost:3000/test/submitAnswer'

      $.post(url, { testId: testId, questionId: questionId, userAnswerIndex: 0 }).done(function (data) {
        if (data) {
          self.setState(data);
        }
        else {
          alert('empty question');
        }
      });

    }

  });


  ReactDOM.render(
    React.createElement(Question, null),
    document.getElementById('container')
  );


};


