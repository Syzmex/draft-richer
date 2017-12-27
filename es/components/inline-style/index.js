'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _inlineStylesControls = require('./inline-styles-controls');

var _inlineStylesControls2 = _interopRequireDefault(_inlineStylesControls);

var _fontFamily = require('./font-family');

var _fontSize = require('./font-size');

var _color = require('./color');

var _customStyles = require('./custom-styles');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  Color: _color.Color,
  FontSize: _fontSize.FontSize,
  FontFamily: _fontFamily.FontFamily,
  customStyles: _extends({}, _color.backgroundColorStyles, _fontFamily.fontFamilyStyles, _fontSize.fontSizeStyles, _color.colorStyles, _customStyles.customStyles),
  InlineStylesControls: _inlineStylesControls2.default
};
module.exports = exports['default'];