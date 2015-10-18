var React = require('react-native');

var {
  StyleSheet,
  Text,
  Platform
  } = React;


var FontedText = React.createClass({
  propTypes: {
    children: React.PropTypes.node,
  },
  render: function () {
    var {style, ...props} = this.props;
    return (
      <Text style={[Platform.OS === "android" && styles.android, style]} {...props}>
        { this.props.children }
      </Text>
    );
  }
});

var styles = StyleSheet.create({
  android: {
    fontFamily: 'sans-serif-thin',
  },
});

module.exports = FontedText;
