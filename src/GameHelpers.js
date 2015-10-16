var _ = require("lodash");


var GameHelpers = {
  getOrderedIndexesWithoutEmpty: (size) => _.range(1, size * size),

  getOrderedIndexes: (size) => GameHelpers.getOrderedIndexesWithoutEmpty(size).concat([null]),

  getMatrixFromIndxes: (indexes, size) => _.chunk(indexes, size),

  getIndexesFromMatrix: (indexes) => _.flatten(indexes),

  isWon: (indexes, size) => _.isEqual(indexes, GameHelpers.getOrderedIndexes(size)),
};

module.exports = GameHelpers;