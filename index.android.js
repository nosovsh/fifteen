var React = require('react-native');
var {
  AppRegistry,
  } = React;

var Game = require('./src/Game');

var Fifteen = React.createClass({
  render: function() {
    return (
      <Game/>
    );
  },
});

AppRegistry.registerComponent('Fifteen', () => Fifteen);
