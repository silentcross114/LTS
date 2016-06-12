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
  var timeout = false;
  var txtNext = $("#textNext").val();

  //question instruction 
  var Instruction = React.createClass({
    render: function () {
      return (
        <div className="topType">
          <span className="typeTypeTxt">{this.props.questionNumber} / 64</span>
          {this.props.instruction}
        </div>
      );
    }
  });

  //countdown timer
  var Timer = React.createClass({
    getInitialState: function () {
      return { timeLimit: this.props.timeLimit };
    },
    render: function () {
      return (<div className="topRemainTime">{SecondsToMMSS(this.state.timeLimit) }</div>)
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
      timeout = false;
      $('input').prop("disabled", false);


      if (this.state.timer) {
        clearInterval(this.state.timer);
      }

      this.setState({
        timeLimit: this.props.timeLimit,
        timer: setInterval(function () {
          var state = this.state;

          if (state.timeLimit == 0) {
            $('input').prop("disabled", true);
            clearInterval(state.timer);
            timeout = true;
            this.props.timeoutCallBack();
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
  var Header = React.createClass({
    render: function () {

      return (
        <div className="topArea">
          <Instruction questionNumber={this.props.questionNumber}  instruction={this.props.instruction} />
          <Timer timeLimit={this.props.timeLimit} timeoutCallBack={this.props.timeoutCallBack}/>
        </div>
      );
    }
  });

  var Answer = React.createClass({
    getInitialState: function () {
      return { checked: false };
    },
    componentWillReceiveProps: function () {
      this.setState({ checked: false });
    },
    render: function () {

      var soundPlayer;

      if (this.props.medium) {
        soundPlayer = (<div className="testAnswerListSound"><AudioPlayer mediumUrl={this.props.medium.url} mediumId={this.props.medium.MediumId}/></div>);
      }
      else {
        soundPlayer = null;
      }

      return (
        <div className="testAnswerListItem" >
          <div className="testAnswerListSound">
            {soundPlayer}
          </div>
          <div className="testAnswerListText" onClick={this.selectThisAnswer} style={this.props.correct ? { fontWeight: 'bold', color: 'green' } : {}}>
            <input type="radio" name={this.props.questionId} value={this.props.answerIndex} checked={this.state.checked} />
            {this.props.answerText}
          </div>
        </div>
      );
    },
    selectThisAnswer: function () {
      if (timeout)
        return;

      this.setState({ checked: true });
    }
  });

  var AudioPlayer = React.createClass({

    render: function () {

      var className = '';

      if (this.state.status == 'Playing') {
        className = 'selected';
      }

      return (
        <div onClick={this.play} className={className}>
          <audio src={this.props.mediumUrl}  preload='auto' id={this.props.mediumId}/>
        </div>
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

  var Ask = React.createClass({

    render: function () {

      var ask;

      if (this.props.QuestionText.Medium) {
        ask = (<div className="testQuestionSound"><AudioPlayer  mediumUrl={this.props.QuestionText.Medium.url} mediumId={this.props.QuestionText.Medium.MediumId}/></div>);
      }
      else {
        ask = (<div className="testQuestionText">{this.props.QuestionText.Text} </div>);
      }

      return (
        <div className="typeQCM">
          <div className="testQA">
            <div className="testQuestionArea">
              {ask}
            </div>
            <div className="testAnswerArea">
              {this.props.Answers.map(function (answer, index) {
                var args = {
                  questionId: this.props.QuestionId,
                  answerIndex: index,
                  answerText: answer.Text,
                  medium: answer.Medium,
                  correct: answer.IsGoodAnswer
                };
                return <Answer {...args} />
              }, this)
              }
            </div>
          </div>
        </div>
      );
    }
  });


  var AskWithMaterial = React.createClass({

    render: function () {

      var material;
      if (this.props.Material.Medium) {
        if (this.props.Material.Medium.MediumType == 1) {
          //audio
          material = (<div className="testSideAreaSound"><AudioPlayer mediumUrl={this.props.Material.Medium.url} mediumId={this.props.Material.Medium.MediumId} /></div>);
        }
        else {
          //picture
          material = (<div className="testPicArea"><img src={this.props.Material.Medium.url} /></div>);
        }
      }
      else {
        material = (<div>{this.props.Material.Text}</div>);
      }

      var question;
      if (this.props.QuestionText.Medium) {
        question = (<div className="testQuestionSound"><AudioPlayer mediumUrl={this.props.QuestionText.Medium.url} mediumId={this.props.QuestionText.Medium.MediumId} /></div>);
      }
      else {
        question = (<div className="testQuestionText">{this.props.QuestionText.Text}</div>);
      }

      return (
        <div className="typeQCM">
          <div  className="sideArea">
            {material}
          </div>

          <div className="mainArea" >
            <div className="testQA">
              <div className="testQuestionArea">
                {question}
              </div>
              <div className="testAnswerArea">
                {this.props.Answers.map(function (answer, index) {
                  var args = {
                    questionId: this.props.QuestionId,
                    answerIndex: index,
                    answerText: answer.Text,
                    medium: answer.Medium,
                    correct: answer.IsGoodAnswer
                  };
                  return <Answer {...args} />
                }, this)
                }
              </div>
            </div>
          </div>
        </div>
      );

    }
  });

  var Footer = React.createClass({
    render: function () {

      return (
        <div className="testConfirm">
          <div className="btnConfirm" onClick={this.props.onSubmit}>
            {txtNext}
          </div>
        </div>
      );
    }
  });

  var Question = React.createClass({
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
        timeLimit: this.state.timeLimit,
        timeoutCallBack: this.autoSubmitAnswer
      };

      var questionAndAnswers;
      switch (this.state.QuestionType) {
        case 2:
        case 5:
        case 7:
          questionAndAnswers = (<AskWithMaterial {...this.state}/>);
          break;
        default:
          questionAndAnswers = (<Ask {...this.state} />);
      }

      return (
        <div>
          <Header {...headerData}/>
          {questionAndAnswers}
          <Footer onSubmit={this.submitAnswer} />
          <div>{JSON.stringify(this.state) }</div>
          
        </div>);

    },
    moveToNextQuestion: function () {
      var self = this;

      //get next question data
      var testId = $('#testId').val();
      var interfaceLanguage = $('#interfaceLanguage').val();

      var url = `${location.protocol}//${location.host}/test/getNextQuestion`;// 'http://localhost:3000/test/getNextQuestion'
      $.post(url, { testId: testId, interfaceLanguage: interfaceLanguage }).done(function (data) {
        if (data) {
          self.setState(data);
        }
        else {
          // window.location = 'http://localhost:3000/test/result/' + testId +'/' + interfaceLanguage;
          window.location = `${location.protocol}//${location.host}/test/result/${testId}/${interfaceLanguage}`;
        }
      });

    },
    submitAnswer: function () {
      var self = this;
      var testId = $('#testId').val();
      var interfaceLanguage = $('#interfaceLanguage').val();
      var questionId = this.state.QuestionId;
      var url = `${location.protocol}//${location.host}/test/submitAnswer`
      var userSelect = $("input:checked").val();

      $.post(url, { testId: testId, questionId: questionId, userAnswerIndex: userSelect, interfaceLanguage: interfaceLanguage, fetchNext: true }).done(function (data) {

        //in case of mannual submit, next question is fetched
        if (data) {
          self.setState(data);
        }
        else {
          //there is no next question, means end of test,go to result page 
          window.location = `${location.protocol}//${location.host}/test/result/${testId}/${interfaceLanguage}`;
        }
      });
    },
    autoSubmitAnswer: function () {
      var self = this;
      var testId = $('#testId').val();
      var interfaceLanguage = $('#interfaceLanguage').val();
      var questionId = this.state.QuestionId;
      var url = `${location.protocol}//${location.host}/test/submitAnswer`;
      var userSelect = $("input:checked").val();

      $.post(url, { testId: testId, questionId: questionId, userAnswerIndex: userSelect, interfaceLanguage: interfaceLanguage, fetchNext: false });
    }
  });


  ReactDOM.render(
    <Question />,
    document.getElementById('testContainer')
  );


};


function SecondsToMMSS(seconds) {
  var second = seconds % 60;
  var minute = Math.floor(seconds / 60);

  if (minute < 10) { minute = "0" + minute; }
  if (second < 10) { second = "0" + second; }

  return minute + ":" + second;
}