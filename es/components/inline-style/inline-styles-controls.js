'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _draftJs = require('draft-js');

var _color = require('./color');

var _fontFamily = require('./font-family');

var _fontSize = require('./font-size');

var _inlineStyles = require('./inline-styles');

var _config = require('../../config');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function InlineStylesControls(props) {
  var editorState = props.editorState;


  var removeStyle = function removeStyle(styles) {

    var selection = editorState.getSelection();

    return Object.keys(styles).reduce(function (contentState, style) {
      return _draftJs.Modifier.removeInlineStyle(contentState, selection, style);
    }, editorState.getCurrentContent());
  };

  var applyStyle = function applyStyle(styles, toggledStyler) {

    var selection = editorState.getSelection();
    var nextContentState = removeStyle(styles);

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
  };

  var handleToggle = function handleToggle(style) {

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
    } else if (selection.getHasFocus()) {
      // 系统内置行内样式
      props.onToggle(_draftJs.RichUtils.toggleInlineStyle(editorState, style));
    }
  };

  // 激活状态判断
  var isActive = function isActive(style) {
    var selection = editorState.getSelection();
    var currentStyle = editorState.getCurrentInlineStyle();
    return currentStyle.has(style) && selection.getHasFocus();
  };

  var styles = props.styles || Object.keys(_inlineStyles.inlineStyles);

  return _react2.default.createElement(
    'div',
    { className: _config.prefixCls + '-toolbar' },
    styles.map(function (key) {
      var style = _inlineStyles.inlineStyles[key];
      var Element = style.Element;
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
  styles: _propTypes2.default.arrayOf(_propTypes2.default.string),
  onToggle: _propTypes2.default.func.isRequired,
  editorState: _propTypes2.default.instanceOf(_draftJs.EditorState).isRequired
};

exports.default = InlineStylesControls;
module.exports = exports['default'];