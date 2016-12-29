'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _draftJs = require('draft-js');

var _blockTypes = require('./block-types');

var _toolbar = require('../toolbar.less');

var _toolbar2 = _interopRequireDefault(_toolbar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 块元素控制器
function BlockTypesControls(props) {
  var editorState = props.editorState,
      selection = editorState.getSelection(),
      blockType = editorState.getCurrentContent().getBlockForKey(selection.getStartKey()).getType(),
      handleToggle = function handleToggle(type) {
    props.onToggle(_draftJs.RichUtils.toggleBlockType(editorState, type));
  },
      isAvtive = function isAvtive(blockType, type) {
    if (Array.isArray(type)) {
      return editorState.getSelection().getHasFocus() && type.includes(blockType);
    }
    return editorState.getSelection().getHasFocus() && type === blockType;
  };


  return _react2.default.createElement(
    'div',
    { className: _toolbar2.default.wrapper },
    (props.types || (0, _keys2.default)(_blockTypes.blockTypes)).map(function (key) {
      var type = _blockTypes.blockTypes[key],
          Element = type.Element,
          typeName = Array.isArray(type.type) ? blockType : type.type;
      return _react2.default.createElement(Element, {
        key: key,
        id: typeName,
        label: type.label,
        title: type.title,
        onToggle: handleToggle,
        active: isAvtive(blockType, type.type) });
    })
  );
}

BlockTypesControls.propTypes = {
  types: _react2.default.PropTypes.arrayOf(_react2.default.PropTypes.string),
  onToggle: _react2.default.PropTypes.func.isRequired,
  editorState: _react2.default.PropTypes.instanceOf(_draftJs.EditorState).isRequired
};

exports.default = BlockTypesControls;
module.exports = exports['default'];