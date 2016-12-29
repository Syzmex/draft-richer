'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _draftJs = require('draft-js');

var _color = require('./color');

var _fontFamily = require('./font-family');

var _fontSize = require('./font-size');

var _inlineStyles = require('./inline-styles');

var _toolbar = require('../toolbar.less');

var _toolbar2 = _interopRequireDefault(_toolbar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function InlineStylesControls(props) {

  var editorState = props.editorState,
      handleToggle = function handleToggle(style) {

    var selection = editorState.getSelection();

    // 自定义行内样式
    if (_fontFamily.fontFamilyStyles[style]) {
      applyStyle(_fontFamily.fontFamilyStyles, style);
    } else if (_fontSize.fontSizeStyles[style]) {
      applyStyle(_fontSize.fontSizeStyles, style);
    } else if (_color.colorStyles[style]) {
      applyStyle(_color.colorStyles, style);
    } else if (_color.backgroundColorStyles[style]) {
      applyStyle(_color.backgroundColorStyles, style);
    }

    // 系统内置行内样式
    else if (selection.getHasFocus()) {
        props.onToggle(_draftJs.RichUtils.toggleInlineStyle(editorState, style));
      }
  },
      applyStyle = function applyStyle(styles, toggledStyler) {

    var selection = editorState.getSelection(),
        nextContentState = removeStyle(styles);

    var nextEditorState = _draftJs.EditorState.push(editorState, nextContentState, 'change-inline-style');

    var currentStyle = editorState.getCurrentInlineStyle();

    // Unset style override for current style.
    if (selection.isCollapsed()) {
      nextEditorState = currentStyle.reduce(function (state, style) {
        return styles[style] ? _draftJs.RichUtils.toggleInlineStyle(state, style) : state;
      }, nextEditorState);
    }

    // If the style is being toggled on, apply it.
    if (!currentStyle.has(toggledStyler)) {
      nextEditorState = _draftJs.RichUtils.toggleInlineStyle(nextEditorState, toggledStyler);
    }

    props.onToggle(nextEditorState);
  },
      removeStyle = function removeStyle(styles) {

    var selection = editorState.getSelection();

    return (0, _keys2.default)(styles).reduce(function (contentState, style) {
      return _draftJs.Modifier.removeInlineStyle(contentState, selection, style);
    }, editorState.getCurrentContent());
  },
      isActive = function isActive(style) {
    var selection = editorState.getSelection(),
        currentStyle = editorState.getCurrentInlineStyle();
    return currentStyle.has(style) && selection.getHasFocus();
  },
      styles = props.styles || (0, _keys2.default)(_inlineStyles.inlineStyles);

  return _react2.default.createElement(
    'div',
    { className: _toolbar2.default.wrapper },
    styles.map(function (key) {
      var style = _inlineStyles.inlineStyles[key],
          Element = style.Element;
      return _react2.default.createElement(Element, {
        id: key,
        key: key,
        label: style.label,
        title: style.title,
        onToggle: handleToggle,
        active: isActive(key) });
    })
  );
}

InlineStylesControls.propTypes = {
  styles: _react2.default.PropTypes.arrayOf(_react2.default.PropTypes.string),
  onToggle: _react2.default.PropTypes.func.isRequired,
  editorState: _react2.default.PropTypes.instanceOf(_draftJs.EditorState).isRequired
};

exports.default = InlineStylesControls;
module.exports = exports['default'];