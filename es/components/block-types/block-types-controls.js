'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _draftJs = require('draft-js');

var _blockTypes = require('./block-types');

var _config = require('../../config');

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
    { className: _config.prefixCls + '-toolbar' },
    (props.types || Object.keys(_blockTypes.blockTypes)).map(function (key) {
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
  types: _propTypes2.default.arrayOf(_propTypes2.default.string),
  onToggle: _propTypes2.default.func.isRequired,
  editorState: _propTypes2.default.instanceOf(_draftJs.EditorState).isRequired
};

exports.default = BlockTypesControls;
module.exports = exports['default'];