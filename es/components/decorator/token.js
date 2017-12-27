'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TokenSpan = undefined;
exports.getTokenStrategy = getTokenStrategy;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = {
  immutable: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    padding: '2px 0'
  },
  mutable: {
    backgroundColor: 'rgba(204, 204, 255, 1.0)',
    padding: '2px 0'
  },
  segmented: {
    backgroundColor: 'rgba(248, 222, 126, 1.0)',
    padding: '2px 0'
  }
};

function getDecoratedStyle(mutability) {
  switch (mutability) {
    case 'IMMUTABLE':
      return styles.immutable;
    case 'MUTABLE':
      return styles.mutable;
    case 'SEGMENTED':
      return styles.segmented;
    default:
      return null;
  }
}

function getTokenStrategy(mutability) {
  return function (contentBlock, callback, contentState) {
    contentBlock.findEntityRanges(function (character) {
      var entityKey = character.getEntity();
      var entity = entityKey && contentState.getEntity(entityKey);
      return entity && entity.getType() === 'TOKEN' && entity.getMutability() === mutability;
    }, callback);
  };
}

var TokenSpan = exports.TokenSpan = function TokenSpan(_ref) {
  var entityKey = _ref.entityKey,
      contentState = _ref.contentState,
      children = _ref.children;


  var style = getDecoratedStyle(contentState.getEntity(entityKey).getMutability());

  return _react2.default.createElement(
    'span',
    { style: style },
    children
  );
};