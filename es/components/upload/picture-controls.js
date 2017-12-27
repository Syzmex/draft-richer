'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp2;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _whatitis = require('whatitis');

var _whatitis2 = _interopRequireDefault(_whatitis);

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

var PictureControls = (_temp2 = _class = function (_React$Component) {
  _inherits(PictureControls, _React$Component);

  function PictureControls() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, PictureControls);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = PictureControls.__proto__ || Object.getPrototypeOf(PictureControls)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      file: null,
      entityKey: '',
      uploaderProps: {
        multiple: false,
        supportServerRender: true,
        action: _whatitis2.default.Function(_this.props.url) ? _this.props.url() : _this.props.url,
        data: _whatitis2.default.Function(_this.props.data) ? _this.props.data() : _this.props.data,
        onStart: function onStart(file) {
          return _this.handleStart(file);
        },
        onSuccess: function onSuccess(response) {
          return _this.handleSuccess(response);
        },
        onProgress: function onProgress(step) {
          _this.handleProgess(Math.round(step.percent));
        },
        onError: function onError(error) {
          return _this.handleError(error);
        }
      }
    }, _this.handleStart = function (file) {
      var _this$props = _this.props,
          editorState = _this$props.editorState,
          onToggle = _this$props.onToggle;

      var editorStateWithFocus = _this.getFocus(editorState);
      var contentState = editorStateWithFocus.getCurrentContent();
      var contentStateWithEntity = contentState.createEntity('PICTURE', 'MUTABLE', {
        name: file.name, abort: function abort() {
          _this.uploader.abort(file);
        }
      });
      var entityKey = contentStateWithEntity.getLastCreatedEntityKey();
      var newEditorState = _draftJs.EditorState.set(editorStateWithFocus, { currentContent: contentStateWithEntity });
      onToggle(_draftJs.AtomicBlockUtils.insertAtomicBlock(newEditorState, entityKey, ' '));
      _this.state.entityKey = entityKey;
      _this.state.file = file;
    }, _this.handleProgess = function (percent) {
      var entityKey = _this.state.entityKey;
      var _this$props2 = _this.props,
          editorState = _this$props2.editorState,
          onToggle = _this$props2.onToggle;

      var contentState = editorState.getCurrentContent().mergeEntityData(entityKey, { percent: percent });
      var newEditorState = _draftJs.EditorState.set(editorState, { currentContent: contentState });
      onToggle(newEditorState);
    }, _this.handleSuccess = function (response) {
      var entityKey = _this.state.entityKey;
      var _this$props3 = _this.props,
          editorState = _this$props3.editorState,
          beforeResponse = _this$props3.beforeResponse,
          onToggle = _this$props3.onToggle;

      var success = function success(_ref2) {
        var hashname = _ref2.hashname;

        var contentState = editorState.getCurrentContent().mergeEntityData(entityKey, {
          hashname: hashname, abort: function abort() {}
        });
        var newEditorState = _draftJs.EditorState.set(editorState, { currentContent: contentState });
        onToggle(newEditorState);
      };
      if (beforeResponse) {
        beforeResponse(response, success, _this.handleError);
      } else {
        success(response);
      }
      _this.state.file = null;
    }, _this.handleError = function (e) {
      var entityKey = _this.state.entityKey;
      var _this$props4 = _this.props,
          editorState = _this$props4.editorState,
          onToggle = _this$props4.onToggle;

      var contentState = editorState.getCurrentContent().mergeEntityData(entityKey, {
        error: _whatitis2.default.String(e) ? e : 'network error', abort: function abort() {}
      });
      var newEditorState = _draftJs.EditorState.set(editorState, { currentContent: contentState });
      onToggle(newEditorState);
      _this.state.file = null;
    }, _this.getFocus = function (editorState) {
      var selection = editorState.getSelection();
      if (!selection.getHasFocus()) {
        return _draftJs.EditorState.moveFocusToEnd(editorState);
      }
      return editorState;
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(PictureControls, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      if (this.props.getPost) {
        this.props.getPost(function (files) {
          files.forEach(function (file) {
            _this2.uploader.refs.inner.post(file);
          });
        });
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      var file = this.state.file;

      if (file) {
        this.uploader.abort(file);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var uploaderProps = this.state.uploaderProps;

      return _react2.default.createElement(
        _rcUpload2.default,
        _extends({
          component: 'div',
          className: _config.prefixCls + '-toolbar',
          ref: function ref(c) {
            if (c) _this3.uploader = c;
          }
        }, uploaderProps),
        _react2.default.createElement(_button2.default, {
          id: 'picture',
          title: '\u63D2\u5165\u56FE\u7247',
          label: _react2.default.createElement(_icons2.default, { type: 'picture' }) })
      );
    }
  }]);

  return PictureControls;
}(_react2.default.Component), _class.propsTypes = {
  url: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.func]).isRequired,
  data: _propTypes2.default.oneOfType([_propTypes2.default.object, _propTypes2.default.func]),
  getPost: _propTypes2.default.func,
  beforeResponse: _propTypes2.default.func,
  onToggle: _propTypes2.default.func.isRequired,
  editorState: _propTypes2.default.instanceOf(_draftJs.EditorState).isRequired
}, _temp2);
exports.default = PictureControls;
module.exports = exports['default'];