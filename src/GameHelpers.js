var _ = require("lodash");


var GameHelpers = {
  getOrderedIndexesWithoutEmpty: (size) => _.range(1, size * size),

  getOrderedIndexes: (size) => GameHelpers.getOrderedIndexesWithoutEmpty(size).concat([null]),

  getMatrix: (indexes, size) => _.chunk(indexes, size),
};

module.exports = GameHelpers;