'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp2;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _draftJs = require('draft-js');

var _icons = require('../icons');

var _icons2 = _interopRequireDefault(_icons);

var _button = require('../button');

var _button2 = _interopRequireDefault(_button);

var _linkModal = require('./link-modal');

var _linkModal2 = _interopRequireDefault(_linkModal);

var _link = require('../decorator/link');

var _config = require('../../config');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LinkControls = (_temp2 = _class = function (_React$Component) {
  _inherits(LinkControls, _React$Component);

  function LinkControls() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, LinkControls);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = LinkControls.__proto__ || Object.getPrototypeOf(LinkControls)).call.apply(_ref, [this].concat(args))), _this), _this.handleToggle = function (values) {
      var editorState = _this.props.editorState;


      if (values) {
        var contentState = editorState.getCurrentContent();
        var contentStateWithEntity = contentState.createEntity('link', 'MUTABLE', {
          url: values.http + values.url, target: values.target
        });
        var entityKey = contentStateWithEntity.getLastCreatedEntityKey();
        var newEditorState = _draftJs.EditorState.set(editorState, { currentContent: contentStateWithEntity });
        _this.props.onToggle(_draftJs.RichUtils.toggleLink(newEditorState, newEditorState.getSelection(), entityKey));
        _this.toggleLinkOption(false);
      } else {
        _this.props.onToggle(_draftJs.RichUtils.toggleLink(editorState, editorState.getSelection(), null));
      }
    }, _this.handleOk = function (values) {
      _this.handleToggle(values);
    }, _this.handleCancel = function () {
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
        document.body.removeChild(_this.container);
        _this.container = null;
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  // 添加链接


  // 取消


  // 弹出链接弹出层


  // 删除链接


  // 开关弹出层


  _createClass(LinkControls, [{
    key: 'hasLink',
    value: function hasLink() {

      var hasLink = false;

      var editorState = this.props.editorState;

      var selection = editorState.getSelection();
      var startOffset = selection.getStartOffset();
      var endOffset = selection.getEndOffset();
      var contentState = editorState.getCurrentContent();
      var contentBlock = contentState.getBlockForKey(selection.getAnchorKey());

      // 寻找实体 LINK， 非异步回调
      contentBlock.findEntityRanges((0, _link.linkFilter)(contentState), function (start, end) {
        if (startOffset < end && endOffset > start) {
          hasLink = true;
        }
      });

      return hasLink;
    }
  }, {
    key: 'render',
    value: function render() {

      return _react2.default.createElement(
        'div',
        { className: _config.prefixCls + '-toolbar' },
        _react2.default.createElement(_button2.default, {
          id: 'add',
          title: '\u6DFB\u52A0\u94FE\u63A5',
          onToggle: this.addLink,
          disabled: !this.isNotCollapsed(),
          label: _react2.default.createElement(_icons2.default, { type: 'link' }) }),
        _react2.default.createElement(_button2.default, {
          id: 'remove',
          title: '\u5220\u9664\u94FE\u63A5',
          label: _react2.default.createElement(_icons2.default, { type: 'unlink' }),
          onToggle: this.removeLink,
          disabled: !(this.isNotCollapsed() && this.hasLink()) })
      );
    }
  }]);

  return LinkControls;
}(_react2.default.Component), _class.propsTypes = {
  onToggle: _propTypes2.default.func.isRequired,
  editorState: _propTypes2.default.instanceOf(_draftJs.EditorState).isRequired
}, _temp2);
exports.default = LinkControls;
module.exports = exports['default'];