'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _inlineStylesControls = require('./inline-styles-controls');

var _inlineStylesControls2 = _interopRequireDefault(_inlineStylesControls);

var _fontFamily = require('./font-family');

var _fontSize = require('./font-size');

var _color = require('./color');

var _inlineStyles = require('./inline-styles');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  Color: _color.Color,
  FontSize: _fontSize.FontSize,
  FontFamily: _fontFamily.FontFamily,
  customStyles: (0, _extends3.default)({}, _color.backgroundColorStyles, _fontFamily.fontFamilyStyles, _fontSize.fontSizeStyles, _color.colorStyles, _inlineStyles.customStyles),
  InlineStylesControls: _inlineStylesControls2.default
};
module.exports = exports['default'];