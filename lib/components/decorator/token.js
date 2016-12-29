'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TokenSpan = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

exports.getTokenStrategy = getTokenStrategy;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _draftJs = require('draft-js');

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
  return function (contentBlock, callback) {
    contentBlock.findEntityRanges(function (character) {
      var entityKey = character.getEntity(),
          entity = entityKey && _draftJs.Entity.get(entityKey);
      return entity && entity.getType() === 'TOKEN' && entity.getMutability() === mutability;
    }, callback);
  };
}

var TokenSpan = exports.TokenSpan = function TokenSpan(props) {

  var style = getDecoratedStyle(_draftJs.Entity.get(props.entityKey).getMutability());

  return _react2.default.createElement(
    'span',
    (0, _extends3.default)({}, props, { style: style }),
    props.children
  );
};