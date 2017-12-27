'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp2;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _rcUpload = require('rc-upload');

var _rcUpload2 = _interopRequireDefault(_rcUpload);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _draftJs = require('draft-js');

var _icons = require('../icons');

var _icons2 = _interopRequireDefault(_icons);

var _button = require('../button');

var _button2 = _interopRequireDefault(_button);

var _config = require('../../config');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AttachmentControls = (_temp2 = _class = function (_React$Component) {
  _inherits(AttachmentControls, _React$Component);

  function AttachmentControls() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, AttachmentControls);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = AttachmentControls.__proto__ || Object.getPrototypeOf(AttachmentControls)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      uploaderProps: {
        multiple: true,
        supportServerRender: true,
        action: _this.props.url,
        // data: { a: 1, b: 2 },
        // headers: {
        //   Authorization: 'xxxxxxx',
        // },
        // beforeUpload( file ) {
        //   console.log( 'beforeUpload', file.name );
        // },
        // onStart: ( file ) => {
        //   console.log('onStart', file.name);
        //   // this.refs.inner.abort(file);
        // },
        onSuccess: function onSuccess(file) {
          console.log('onSuccess', file);
        },
        onProgress: function onProgress(step, file) {
          console.log('onProgress', Math.round(step.percent), file.name);
        },
        onError: function onError(err) {
          console.log('onError', err);
        }
      }
    }, _this.handleToggle = function (values) {
      var editorState = _this.props.editorState;


      if (values) {
        var contentState = editorState.getCurrentContent();
        var contentStateWithEntity = contentState.createEntity('LINK', 'MUTABLE', {
          url: values.http + values.url, target: values.target
        });
        var entityKey = contentStateWithEntity.getLastCreatedEntityKey();
        var newEditorState = _draftJs.EditorState.set(editorState, { currentContent: contentStateWithEntity });
        _this.props.onToggle(_draftJs.RichUtils.toggleLink(newEditorState, newEditorState.getSelection(), entityKey));
        _this.toggleLinkOption(false);
      } else {
        _this.props.onToggle(_draftJs.RichUtils.toggleLink(editorState, editorState.getSelection(), null));
      }
    }, _this.isNotCollapsed = function () {
      var selection = _this.props.editorState.getSelection();
      return !selection.isCollapsed() && selection.getHasFocus();
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(AttachmentControls, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var uploaderProps = this.state.uploaderProps;

      return _react2.default.createElement(
        _rcUpload2.default,
        _extends({
          component: 'div',
          className: _config.prefixCls + '-toolbar',
          ref: function ref(c) {
            _this2.uploader = c;
          }
        }, uploaderProps),
        _react2.default.createElement(_button2.default, {
          id: 'attachment',
          title: '\u4E0A\u4F20\u9644\u4EF6',
          label: _react2.default.createElement(_icons2.default, { type: 'attachment' }) })
      );
    }
  }]);

  return AttachmentControls;
}(_react2.default.Component), _class.propsTypes = {
  url: _propTypes2.default.string.isRequired,
  getFile: _propTypes2.default.func.isRequired,
  onToggle: _propTypes2.default.func.isRequired,
  editorState: _propTypes2.default.instanceOf(_draftJs.EditorState).isRequired
}, _temp2);
exports.default = AttachmentControls;
module.exports = exports['default'];