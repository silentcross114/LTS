

var Question = React.createClass({displayName: "Question",
   render : function(){
       
       return (React.createElement("div", null, "this is a question component"));
       
   } 
    
});


ReactDOM.render(
  React.createElement(Hello, {name: "World"}),
  document.getElementById('container')
);