// /** @jsx React.DOM */

// var React = require('react');
// var ReactDOMServer = require('react-dom/server');

window.onload = function () {

  // var BtnSubmit = React.createClass({
  //   render: function () {

  //     return (<div onClick={this.props.onSubmit}>Next</div>)
  //   }
  // });
  var audioPlaying = false;

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
    getInitialState: function () {
      return { timeLimit: this.props.timeLimit };
    },
    render: function () {
      return (React.createElement("div", {className: "topRemainTime"}, this.state.timeLimit))
    },

    componentWillReceiveProps: function () {
      this.resetTimer();
    },
    componentDidMount: function () {
      this.resetTimer();
    },
    componentWillUnmount: function () {
      if (this.state.timer) {
        clearInterval(this.state.timer);
      }
    },
    resetTimer: function () {
      if (this.state.timer) {
        clearInterval(this.state.timer);
      }

      this.setState({
        timeLimit: this.props.timeLimit,
        timer: setInterval(function () {
          var state = this.state;

          if (state.timeLimit == 0) {
            $('input').attr("disabled", true);
            clearInterval(state.timer);
          }
          else {
            state.timeLimit--;
            this.setState(state)
          }
        }.bind(this), 1000)
      });
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

  var Answer = React.createClass({displayName: "Answer",
    getInitialState: function () {
      return { checked: false };
    },
    componentWillReceiveProps: function () {
      this.setState({ checked: false });
    },
    render: function () {

      var soundPlayer;

      if (this.props.medium) {
        soundPlayer = (React.createElement("div", {className: "testAnswerListSound"}, React.createElement(AudioPlayer, {mediumUrl: this.props.medium.url, mediumId: this.props.medium.MediumId})));
      }
      else {
        soundPlayer = null;
      }

      return (
        React.createElement("div", {className: "testAnswerListItem"}, 
          React.createElement("div", {className: "testAnswerListSound"}, 
            soundPlayer
          ), 
          React.createElement("div", {className: "testAnswerListText", onClick: this.selectThisAnswer, style: this.props.correct ? { fontWeight: 'bold', color: 'green' } : {}}, 
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

      var className = '';

      if (this.state.status == 'Playing') {
        className = 'selected';
      }

      return (
        React.createElement("div", {onClick: this.play, className: className}, 
          React.createElement("audio", {src: this.props.mediumUrl, preload: "auto", id: this.props.mediumId})
        )
      );
    },
    getInitialState: function () {
      return { status: "Ready" };
    },
    componentDidMount: function () {
      var player = this;

      //initial audio finished event
      var oAudio = document.getElementById(this.props.mediumId);
      oAudio.addEventListener('ended', function () {
        //reset status
        player.setState({ status: 'Ready' });
        audioPlaying = false;
      }, false);

    },
    play: function () {

      //if current audio is being played, block
      if (this.state.status == 'Playing') {
        return;
      }

      //if other audio is being played, block
      if (audioPlaying) {
        return;
      }

      //update status
      audioPlaying = true;
      this.setState({ status: 'Playing' });

      //play audio
      var oAudio = document.getElementById(this.props.mediumId);
      oAudio.play();

    }
  });

  var Ask = React.createClass({displayName: "Ask",

    render: function () {

      var ask;

      if (this.props.QuestionText.Medium) {
        ask = (React.createElement("div", {className: "testQuestionSound"}, React.createElement(AudioPlayer, {mediumUrl: this.props.QuestionText.Medium.url, mediumId: this.props.QuestionText.Medium.MediumId})));
      }
      else {
        ask = (React.createElement("div", {className: "testQuestionText"}, this.props.QuestionText.Text, " "));
      }

      return (
        React.createElement("div", {className: "typeQCM"}, 
          React.createElement("div", {className: "testQA"}, 
            React.createElement("div", {className: "testQuestionArea"}, 
              ask
            ), 
            React.createElement("div", {className: "testAnswerArea"}, 
              this.props.Answers.map(function (answer, index) {
                var args = {
                  questionId: this.props.QuestionId,
                  answerIndex: index,
                  answerText: answer.Text,
                  medium: answer.Medium,
                  correct: answer.IsGoodAnswer
                };
                return React.createElement(Answer, React.__spread({},  args))
              }, this)
              
            )
          )
        )
      );
    }
  });


  var AskWithMaterial = React.createClass({displayName: "AskWithMaterial",

    render: function () {

      var material;
      if (this.props.Material.Medium) {
        if (this.props.Material.Medium.MediumType == 1) {
          //audio
          material = (React.createElement("div", {className: "testSideAreaSound"}, React.createElement(AudioPlayer, {mediumUrl: this.props.Material.Medium.url, mediumId: this.props.Material.Medium.MediumId})));
        }
        else {
          //picture
          material = (React.createElement("div", {className: "testPicArea"}, React.createElement("img", {src: this.props.Material.Medium.url})));
        }
      }
      else {
        material = (React.createElement("div", null, this.props.Material.Text));
      }

      var question;
      if (this.props.QuestionText.Medium) {
        question = (React.createElement("div", {className: "testQuestionSound"}, React.createElement(AudioPlayer, {mediumUrl: this.props.QuestionText.Medium.url, mediumId: this.props.QuestionText.Medium.MediumId})));
      }
      else {
        question = (React.createElement("div", {className: "testQuestionText"}, this.props.QuestionText.Text));
      }

      return (
        React.createElement("div", {className: "typeQCM"}, 
          React.createElement("div", {className: "sideArea"}, 
            material
          ), 

          React.createElement("div", {className: "mainArea"}, 
            React.createElement("div", {className: "testQA"}, 
              React.createElement("div", {className: "testQuestionArea"}, 
                question
              ), 
              React.createElement("div", {className: "testAnswerArea"}, 
                this.props.Answers.map(function (answer, index) {
                  var args = {
                    questionId: this.props.QuestionId,
                    answerIndex: index,
                    answerText: answer.Text,
                    medium: answer.Medium,
                    correct: answer.IsGoodAnswer
                  };
                  return React.createElement(Answer, React.__spread({},  args))
                }, this)
                
              )
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

      var questionAndAnswers;
      switch (this.state.QuestionType) {
        case 2:
        case 5:
        case 7:
          questionAndAnswers = (React.createElement(AskWithMaterial, React.__spread({},  this.state)));
          break;
        default:
          questionAndAnswers = (React.createElement(Ask, React.__spread({},  this.state)));
      }

      return (
        React.createElement("div", null, 
          React.createElement("div", null, JSON.stringify(this.state) ), 
          React.createElement(Header, React.__spread({},  headerData)), 
          questionAndAnswers, 
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


