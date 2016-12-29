'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Link = undefined;
exports.findLinkEntities = findLinkEntities;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _draftJs = require('draft-js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = {
  link: {
    color: '#3b5998',
    textDecoration: 'underline'
  }
};

function findLinkEntities(contentBlock, callback) {
  contentBlock.findEntityRanges(function (character) {
    var entityKey = character.getEntity();
    return entityKey !== null && _draftJs.Entity.get(entityKey).getType() === 'LINK';
  }, callback);
}

var Link = exports.Link = function Link(props) {
  var _Entity$get$getData = _draftJs.Entity.get(props.entityKey).getData(),
      url = _Entity$get$getData.url,
      target = _Entity$get$getData.target;

  return _react2.default.createElement(
    'a',
    { href: url, target: target, style: styles.link },
    props.children
  );
};