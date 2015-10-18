var React = require('react-native');
var GameHelpers = require('./GameHelpers');
var Tile = require('./Tile');
var _ = require("lodash");

var {
  AppRegistry,
  StyleSheet,
  View,
  Animated,
  PanResponder,
  Text,
  ScrollView,
  addons,
  TouchableOpacity
  } = React;

var CELL_SIZE = 60;


var GameBoard = React.createClass({
  propTypes: {
    boardSize: React.PropTypes.number.isRequired,
    indexes: React.PropTypes.array.isRequired
  },

  render: function () {
    var indexesMatrix = GameHelpers.getMatrixFromIndxes(this.props.indexes, this.props.boardSize);
    var orderedIndexesMatrix = GameHelpers.getMatrixFromIndxes(GameHelpers.getOrderedIndexes(this.props.boardSize), this.props.boardSize);
    var tiles = _.flatten(indexesMatrix.map((row, i) => {
      return row.map((index, j) => {
        var axis, direction, moveTo;
        if (i > 0 && indexesMatrix[i - 1][j] === null) {
          axis = 'y';
          direction = -1;
          moveTo = {x: j, y: i - 1};
        } else if (i < this.props.boardSize - 1 && indexesMatrix[i + 1][j] === null) {
          axis = 'y';
          direction = 1;
          moveTo = {x: j, y: i + 1};
        } else if (j > 0 && indexesMatrix[i][j - 1] === null) {
          axis = 'x';
          direction = -1;
          moveTo = {x: j - 1, y: i};
        } else if (j < this.props.boardSize - 1 && indexesMatrix[i][j + 1] === null) {
          axis = 'x';
          direction = 1;
          moveTo = {x: j + 1, y: i};
        }
        return index ? (
          <Tile
            index={index}
            coordinates={{x: j, y: i}}
            axis={axis}
            direction={direction}
            size={CELL_SIZE}
            onMoved={() => this.props.onMoved({x: j, y: i}, moveTo)}
            isPlacedCorrectly={orderedIndexesMatrix[i][j] === index}
            key={index}
          />
        ) : null
      })
    }));

    return (
      <View style={
        [styles.board, {
          width: this.props.boardSize * CELL_SIZE + 2,
          height: this.props.boardSize * CELL_SIZE + 2,
        }]}>
        {tiles}
      </View>
    );
  }
});

var styles = StyleSheet.create({
  board: {
    backgroundColor: '#F4F4F4'
  }
});

module.exports = GameBoard;
