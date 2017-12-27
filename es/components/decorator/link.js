'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Link = exports.linkFilter = undefined;
exports.findLinkEntities = findLinkEntities;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _config = require('../../config');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var linkFilter = exports.linkFilter = function linkFilter(contentState) {
  return function (character) {
    var entityKey = character.getEntity();
    var entity = entityKey && contentState.getEntity(entityKey);
    return entity && entity.getType() === 'link';
  };
};

function findLinkEntities(contentBlock, callback, contentState) {
  contentBlock.findEntityRanges(linkFilter(contentState), callback);
}

var Link = exports.Link = function Link(_ref) {
  var entityKey = _ref.entityKey,
      contentState = _ref.contentState,
      children = _ref.children;

  var _contentState$getEnti = contentState.getEntity(entityKey).getData(),
      url = _contentState$getEnti.url,
      target = _contentState$getEnti.target;

  return _react2.default.createElement(
    'a',
    { href: url, target: target, className: _config.prefixCls + '-link' },
    children
  );
};