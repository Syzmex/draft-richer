'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _richEditor = require('./richEditor');

var _richEditor2 = _interopRequireDefault(_richEditor);

var _article = require('./article');

var _article2 = _interopRequireDefault(_article);

require('./style/Draft.css');

require('./style/editor.less');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  Article: _article2.default,
  RichEditor: _richEditor2.default
};
module.exports = exports['default'];