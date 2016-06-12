// /** @jsx React.DOM */

// var React = require('react');
// var ReactDOMServer = require('react-dom/server');

  var Question = React.createClass({displayName: "Question",
    render: function () {

      return (React.createElement("div", null, "this is a question component"));

    }

  });


  ReactDOM.render(
    React.createElement(Question, null),
    document.getElementById('container')
  );  

