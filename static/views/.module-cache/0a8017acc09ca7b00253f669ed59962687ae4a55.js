// /** @jsx React.DOM */

// var React = require('react');
// var ReactDOMServer = require('react-dom/server');

window.onload = function () {

  var Question = React.createClass({displayName: "Question",
    getInitialState: function () {
        this.moveToNextQuestion();
    },
    render: function () {

      return (React.createElement("div", null, JSON.stringify(this.state) ));

    },
    moveToNextQuestion: function () {
      
      //get next question data
      var testId = $('#testId').val();
      var url = 'http://localhost:3000/test/getNextQuestion'
      $.post(url, {testId : testId}).done(function(data){
        this.setState(data);
      }).bind(this);
      
    }

  });


  ReactDOM.render(
    React.createElement(Question, null),
    document.getElementById('container')
  );


};


