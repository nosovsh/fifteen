var React = require('react-native');
var Dimensions = require('Dimensions');

var screen = Dimensions.get('window');

var {
  AppRegistry,
  StyleSheet,
  View,
  Animated,
  PanResponder,
  Text
  } = React;


var Modal = React.createClass({
  getInitialState: function () {
    return {
      position: new Animated.Value(this.props.isOpen ? 0 : screen.height),
      visible: this.props.isOpen
    }
  },

  componentWillReceiveProps(nextProps) {
    if (!this.props.isOpen && nextProps.isOpen) {
      this.animateOpen();
    } else if (this.props.isOpen && !nextProps.isOpen) {
      this.animateClose();
    }
  },

  /*
   * Open animation for the modal, will move up
   */
  animateOpen: function () {
    this.setState({visible: true}, () => {
      Animated.spring(
        this.state.position, {
          toValue: 0,
          friction: 8
        }
      ).start();
    })
  },

  /*
   * Close animation for the modal, will move down
   */
  animateClose: function () {
    Animated.timing(
      this.state.position,
      {
        toValue: screen.height,
        duration: 400
      }
    ).start(() => this.setState({visible: false}));
  },

  render: function () {
    if (!this.state.visible) {
      return null
    }
    return (
      <View style={[styles.wrapper]}>
      { this.props.isOpen ? <View style={[styles.backdrop]}></View> : null}
        <Animated.View style={[styles.modal, {transform: [{translateY: this.state.position}, {translateX: 0}]}]}>
          { this.props.children }
        </Animated.View>
      </View>
    )

  }
});

var styles = StyleSheet.create({
  wrapper: {
    position: "absolute",
    top: 0,
    left: 0,
    height: screen.height,
    width: screen.width,
    justifyContent: 'center',
    backgroundColor: "transparent",
  },
  modal: {
    backgroundColor: "white",
    margin: 20,
  },
  backdrop: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    opacity: 0.5,
    backgroundColor: "#000000",
  }

});
module.exports = Modal;