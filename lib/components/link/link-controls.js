'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _class, _temp2;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _draftJs = require('draft-js');

var _icons = require('../icons');

var _icons2 = _interopRequireDefault(_icons);

var _button = require('../button');

var _button2 = _interopRequireDefault(_button);

var _linkModal = require('./link-modal');

var _linkModal2 = _interopRequireDefault(_linkModal);

var _toolbar = require('../toolbar.less');

var _toolbar2 = _interopRequireDefault(_toolbar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var LinkControls = (_temp2 = _class = function (_React$Component) {
  (0, _inherits3.default)(LinkControls, _React$Component);

  function LinkControls() {
    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, LinkControls);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.handleToggle = function (values) {
      var editorState = _this.props.editorState,
          selection = editorState.getSelection();


      if (values) {
        var entityKey = _draftJs.Entity.create('LINK', 'MUTABLE', {
          url: values.http + values.url, target: values.target
        });
        _this.props.onToggle(_draftJs.RichUtils.toggleLink(editorState, selection, entityKey));
        _this.toggleLinkOption(false);
      } else {
        _this.props.onToggle(_draftJs.RichUtils.toggleLink(editorState, selection, null));
      }
    }, _this.handleOk = function (values) {
      _this.handleToggle(values);
    }, _this.handleCancel = function (values) {
      _this.toggleLinkOption(false);
    }, _this.addLink = function () {
      _this.toggleLinkOption(true);
    }, _this.removeLink = function () {
      _this.handleToggle();
    }, _this.toggleLinkOption = function (open) {
      open ? _this.openModal() : _this.closeModal();
    }, _this.isNotCollapsed = function () {
      var selection = _this.props.editorState.getSelection();
      return !selection.isCollapsed() && selection.getHasFocus();
    }, _this.openModal = function () {

      if (!_this.container) {
        _this.container = document.createElement('div');
        document.body.appendChild(_this.container);
      }

      _reactDom2.default.render(_react2.default.createElement(_linkModal2.default, {
        onOk: _this.handleOk,
        onCancel: _this.handleCancel }), _this.container);
    }, _this.closeModal = function () {
      if (_this.container) {
        _reactDom2.default.unmountComponentAtNode(_this.container);
      }
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  // 添加链接


  // 取消


  // 弹出链接弹出层


  // 删除链接


  // 开关弹出层


  LinkControls.prototype.hasLink = function hasLink() {

    var hasLink = false;

    var editorState = this.props.editorState,
        selection = editorState.getSelection(),
        startOffset = selection.getStartOffset(),
        endOffset = selection.getEndOffset(),
        block = editorState.getCurrentContent().getBlockForKey(selection.getStartKey());

    // 寻找实体 LINK， 非异步回调

    block.findEntityRanges(function (character) {
      var entityKey = character.getEntity();
      return entityKey !== null && _draftJs.Entity.get(entityKey).getType() === 'LINK';
    }, function (start, end) {
      if (startOffset < end && endOffset > start) {
        hasLink = true;
      }
    });

    return hasLink;
  };

  LinkControls.prototype.render = function render() {

    return _react2.default.createElement(
      'div',
      { className: _toolbar2.default.wrapper },
      _react2.default.createElement(_button2.default, {
        id: 'add',
        title: '添加链接',
        onToggle: this.addLink,
        disabled: !this.isNotCollapsed(),
        label: _react2.default.createElement(_icons2.default, { type: 'link' }) }),
      _react2.default.createElement(_button2.default, {
        id: 'remove',
        title: '删除链接',
        label: _react2.default.createElement(_icons2.default, { type: 'unlink' }),
        onToggle: this.removeLink,
        disabled: !(this.isNotCollapsed() && this.hasLink()) })
    );
  };

  return LinkControls;
}(_react2.default.Component), _class.propsTypes = {
  onToggle: _react2.default.PropTypes.func.isRequired,
  editorState: _react2.default.PropTypes.instanceOf(_draftJs.EditorState).isRequired
}, _temp2);
exports.default = LinkControls;
module.exports = exports['default'];