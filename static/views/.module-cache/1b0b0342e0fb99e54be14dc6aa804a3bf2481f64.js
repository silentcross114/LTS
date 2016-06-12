// /** @jsx React.DOM */

// var React = require('react');
// var ReactDOMServer = require('react-dom/server');

window.onload = function () {

  // var BtnSubmit = React.createClass({
  //   render: function () {

  //     return (<div onClick={this.props.onSubmit}>Next</div>)
  //   }
  // });

  //question instruction 
  var Instruction = React.createClass({displayName: "Instruction",
    render: function () {
      return (
        React.createElement("div", {className: "topType"}, 
          React.createElement("span", {className: "typeTypeTxt"}, this.props.questionNumber, " / 64"), 
          this.props.instruction
        )
      );
    }
  });

  //countdown timer
  var Timer = React.createClass({displayName: "Timer",
    render: function () {
      return (React.createElement("div", {className: "topRemainTime"}, this.props.timeLimit))
    }
  });

  // Header of question, contains instruction and countdown timer
  var Header = React.createClass({displayName: "Header",
    render: function () {

      return (
        React.createElement("div", {className: "topArea"}, 
          React.createElement(Instruction, {questionNumber: this.props.questionNumber, instruction: this.props.instruction}), 
          React.createElement(Timer, {timeLimit: this.props.timeLimit})
        )
      );
    }
  });

  var TextAnswer = React.createClass({displayName: "TextAnswer",
    getInitialState: function () {
      return { checked: false };
    },
    render: function () {

      var soundPlayer;

      if (this.props.medium) {
        soundPlayer = (React.createElement("div", {className: "testAnswerListSound"}, React.createElement(AudioPlayer, {mediumUrl: this.props.medium.url})));
      }
      else {
        soundPlayer = null;
      }

      return (
        React.createElement("div", {className: "testAnswerListItem", onClick: this.selectThisAnswer}, 
          React.createElement("div", {className: "testAnswerListSound"}, 
          soundPlayer
          ), 
          React.createElement("div", {className: "testAnswerListText"}, 
            React.createElement("input", {type: "radio", name: this.props.questionId, value: this.props.answerIndex, checked: this.state.checked}), 
            this.props.answerText
          )
        )
      );
    },
    selectThisAnswer: function () {
      this.setState({ checked: true });
    }
  });

  var AudioPlayer = React.createClass({displayName: "AudioPlayer",

    render: function () {

      return (
        React.createElement("div", null, 
          React.createElement("audio", {src: this.props.mediumUrl, preload: "auto"})
        )
      );
    }
  });

  var Ask = React.createClass({displayName: "Ask",

    render: function () {

      return (
        React.createElement("div", {className: "typeQCM"}, 
          React.createElement("div", {className: "testQA"}, 

            React.createElement("div", {className: "testQuestionArea"}, 
              React.createElement("div", {className: "testQuestionText"}, this.props.QuestionText.Text, " ")
            ), 


            React.createElement("div", {className: "testAnswerArea"}, 
              this.props.Answers.map(function (answer, index) {
                var args = {
                  questionId: this.props.QuestionId,
                  answerIndex: index,
                  answerText: answer.Text,
                  medium : answer.Medium
                };
                return React.createElement(TextAnswer, React.__spread({},  args))
              }, this)
              
            )
          )

        )
      );


    }

  });


  var Footer = React.createClass({displayName: "Footer",
    render: function () {

      return (
        React.createElement("div", {className: "testConfirm"}, 
          React.createElement("div", {className: "btnConfirm", onClick: this.props.onSubmit}, 
            "Next"
          )
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

      if (!this.state)
        return null;

      var headerData = {
        questionNumber: this.state.questionNumber,
        instruction: this.state.instructionText,
        timeLimit: this.state.timeLimit
      };

      return (
        React.createElement("div", null, 
          React.createElement("div", null, JSON.stringify(this.state) ), 
          React.createElement(Header, React.__spread({},  headerData)), 
          React.createElement(Ask, React.__spread({},  this.state)), 
          React.createElement(Footer, {onSubmit: this.submitAnswer})
        ));

    },
    moveToNextQuestion: function () {
      var self = this;

      //get next question data
      var testId = $('#testId').val();
      var interfaceLanguage = $('#interfaceLanguage').val();

      var url = 'http://localhost:3000/test/getNextQuestion'
      $.post(url, { testId: testId, interfaceLanguage: interfaceLanguage }).done(function (data) {
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
      var userSelect = $("input:checked").val();

      $.post(url, { testId: testId, questionId: questionId, userAnswerIndex: userSelect, interfaceLanguage: interfaceLanguage }).done(function (data) {
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


