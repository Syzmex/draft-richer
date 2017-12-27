'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.inlineStyles = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _icons = require('../icons');

var _icons2 = _interopRequireDefault(_icons);

var _fontSize = require('./font-size');

var _fontFamily = require('./font-family');

var _color = require('./color');

var _button = require('../button');

var _button2 = _interopRequireDefault(_button);

var _buttonPopover = require('../button-popover');

var _buttonPopover2 = _interopRequireDefault(_buttonPopover);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import { Map } from 'Immutable';
// import { DefaultDraftInlineStyle } from 'draft-js';
var inlineStyles = exports.inlineStyles = {

  // 系统默认
  BOLD: {
    label: _react2.default.createElement(_icons2.default, { type: 'fontbold' }),
    title: '粗体',
    Element: _button2.default
  },
  ITALIC: {
    title: '斜体',
    label: _react2.default.createElement(_icons2.default, { type: 'fontitalics' }),
    Element: _button2.default
  },
  UNDERLINE: {
    title: '下划线',
    label: _react2.default.createElement(_icons2.default, { type: 'fontunderline' }),
    Element: _button2.default
  },
  STRIKETHROUGH: {
    title: '删除线',
    label: _react2.default.createElement(_icons2.default, { type: 'fontstrikethrough' }),
    Element: _button2.default
  },
  CODE: {
    title: '行内代码块',
    label: 'Monospace',
    Element: _button2.default
  },

  // 自定义
  FONTFAMILY: {
    title: '字体',
    label: _react2.default.createElement(_icons2.default, { type: 'font' }),
    Element: function Element(props) {
      return _react2.default.createElement(
        _buttonPopover2.default,
        props,
        _react2.default.createElement(_fontFamily.FontFamily, {
          select: props.type,
          onChange: props.onToggle })
      );
    }
  },
  FONTSIZE: {
    title: '字体大小',
    label: _react2.default.createElement(_icons2.default, { type: 'fontsize' }),
    Element: function Element(props) {
      return _react2.default.createElement(
        _buttonPopover2.default,
        props,
        _react2.default.createElement(_fontSize.FontSize, {
          select: props.type,
          onChange: props.onToggle })
      );
    }
  },
  FONTCOLOR: {
    label: _react2.default.createElement(_icons2.default, { type: 'fontcolormerge' }),
    title: '字体颜色',
    Element: function Element(props) {
      return _react2.default.createElement(
        _buttonPopover2.default,
        props,
        _react2.default.createElement(_color.Color, {
          type: 'color',
          select: props.type,
          onChange: props.onToggle })
      );
    }
  },
  FONTBACKGROUNTCOLOR: {
    label: _react2.default.createElement(_icons2.default, { type: 'fontbackground' }),
    title: '字体高亮',
    Element: function Element(props) {
      return _react2.default.createElement(
        _buttonPopover2.default,
        props,
        _react2.default.createElement(_color.Color, {
          type: 'backgroundcolor',
          select: props.type,
          onChange: props.onToggle })
      );
    }
  }
};