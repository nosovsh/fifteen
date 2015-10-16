var React = require('react-native');
var GameHelpers = require('./GameHelpers');
var Tile = require('./Tile');

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
  },

  getInitialState: function () {
    return {
      indexes: GameHelpers.getOrderedIndexes(this.props.boardSize),
      isWon: false
    };
  },

  onMoved: function (moveFrom, moveTo) {
    var indexesMatrix = GameHelpers.getMatrixFromIndxes(this.state.indexes, this.props.boardSize);
    indexesMatrix[moveTo.y][moveTo.x] = indexesMatrix[moveFrom.y][moveFrom.x];
    indexesMatrix[moveFrom.y][moveFrom.x] = null;
    this.setState({
      indexes: GameHelpers.getIndexesFromMatrix(indexesMatrix),
      isWon: GameHelpers.isWon(GameHelpers.getIndexesFromMatrix(indexesMatrix))
    })
  },

  render: function () {
    var indexesMatrix = GameHelpers.getMatrixFromIndxes(this.state.indexes, this.props.boardSize);
    var cells = indexesMatrix.map((row, i) => {
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
            log={this.log}
            onMoved={() => this.onMoved({x: j, y: i}, moveTo)}
          />
        ) : null
      })
    });

    return (
      <View style={
        [styles.board, {
          width: this.props.boardSize * CELL_SIZE + 2,
          height: this.props.boardSize * CELL_SIZE + 2,
        }]}>
        {cells}
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
