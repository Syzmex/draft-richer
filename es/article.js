'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _draftJs = require('draft-js');

var _blockRenderer = require('./components/block-types/block-renderer');

var _customStyles = require('./components/inline-style/custom-styles');

var _customStyles2 = _interopRequireDefault(_customStyles);

var _fontFamilyStyles = require('./components/inline-style/font-family-styles');

var _fontFamilyStyles2 = _interopRequireDefault(_fontFamilyStyles);

var _fontSizeStyles = require('./components/inline-style/font-size-styles');

var _fontSizeStyles2 = _interopRequireDefault(_fontSizeStyles);

var _colorStyles = require('./components/inline-style/color-styles');

var _utils = require('./utils');

var _config = require('./config');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function Article(_ref) {
  var content = _ref.content,
      className = _ref.className,
      fileurl = _ref.fileurl,
      props = _objectWithoutProperties(_ref, ['content', 'className', 'fileurl']);

  var editorState = (0, _utils.createArticleState)(content, true);
  var clsnames = (0, _classnames2.default)(_config.prefixCls + '-article', className);
  var blockPorps = { fileurl: fileurl };

  return _react2.default.createElement(
    'div',
    _extends({ className: clsnames }, props),
    _react2.default.createElement(_draftJs.Editor, {
      readOnly: true,
      tabIndex: '-1',
      editorState: editorState,
      customStyleMap: Object.assign(_colorStyles.backgroundColorStyles, _fontFamilyStyles2.default, _fontSizeStyles2.default, _customStyles2.default, _colorStyles.colorStyles),
      blockRenderMap: _blockRenderer.blockRenderMap,
      blockRendererFn: (0, _blockRenderer.articleBlockRenderer)(blockPorps),
      blockStyleFn: _blockRenderer.blockClassName })
  );
}

Article.propsTypes = {
  content: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number, _propTypes2.default.object])
};

exports.default = Article;
module.exports = exports['default'];