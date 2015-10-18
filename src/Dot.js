var React = require('react-native');

var {
  AppRegistry,
  StyleSheet,
  View,
  Animated,
  PanResponder,
  Text
  } = React;


var Dot = React.createClass({
  propTypes: {
    isPlacedCorrectly: React.PropTypes.bool.isRequired,
  },

  getInitialState: function () {
    return {
      scale: new Animated.Value(this.props.isPlacedCorrectly ? 1 : 0.01)
    };
  },

  componentWillReceiveProps: function (nextProps) {
    if (!this.props.isPlacedCorrectly && nextProps.isPlacedCorrectly) {
      this.animateShow();
    } else if (this.props.isPlacedCorrectly && !nextProps.isPlacedCorrectly) {
      this.animateHide();
    }
  },

  animateShow: function () {
    Animated.timing(this.state.scale, {
      toValue: 1,
      duration: 100,
    }).start();
  },

  animateHide: function () {
    Animated.timing(this.state.scale, {
      toValue: 0.01,
      duration: 100,
    }).start();
  },

  render: function () {
    return (
      <Animated.View style={[styles.dot, {transform: [{scale: this.state.scale}]}]}/>
    );
  }
});

var styles = StyleSheet.create({
  dot: {
    backgroundColor: '#FF3366',
    width: 6,
    height: 6,
    borderRadius: 3,
  }
});

module.exports = Dot;
