'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _draftJs = require('draft-js');

var _token = require('./token');

var _link = require('./link');

exports.default = new _draftJs.CompositeDecorator([{
  strategy: (0, _token.getTokenStrategy)('IMMUTABLE'),
  component: _token.TokenSpan
}, {
  strategy: (0, _token.getTokenStrategy)('MUTABLE'),
  component: _token.TokenSpan
}, {
  strategy: (0, _token.getTokenStrategy)('SEGMENTED'),
  component: _token.TokenSpan
}, {
  strategy: _link.findLinkEntities,
  component: _link.Link
}]);
module.exports = exports['default'];