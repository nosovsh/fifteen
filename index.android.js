var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
} = React;

var Game = require('./src/Game');

var Fifteen = React.createClass({
  render: function() {
    return (
      <Game/>
    );
  }
});

var styles = StyleSheet.create({
});

AppRegistry.registerComponent('Fifteen', () => Fifteen);
