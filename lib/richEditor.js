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

var _isObject2 = require('lodash/isObject');

var _isObject3 = _interopRequireDefault(_isObject2);

var _class, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _draftJs = require('draft-js');

var _blockTypes = require('./components/block-types');

var _inlineStyle = require('./components/inline-style');

var _link = require('./components/link');

var _decorator = require('./components/decorator');

var _decorator2 = _interopRequireDefault(_decorator);

var _editor = require('./editor.less');

var _editor2 = _interopRequireDefault(_editor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RichEditor = (_temp = _class = function (_React$Component) {
  (0, _inherits3.default)(RichEditor, _React$Component);

  function RichEditor(props) {
    (0, _classCallCheck3.default)(this, RichEditor);

    var _this = (0, _possibleConstructorReturn3.default)(this, _React$Component.call(this, props));

    _this.handleChange = function (editorState) {
      _this.setState({ editorState: editorState });
      if (_this.props.onChange) {
        _this.props.onChange((0, _draftJs.convertToRaw)(editorState.getCurrentContent()), editorState);
      }
    };

    _this.focus = function () {
      // this.refs.editor.focus();
    };

    _this.handleKeyCommand = function (command) {
      var editorState = _this.state.editorState,
          nextState = _draftJs.RichUtils.handleKeyCommand(editorState, command);

      if (nextState) {
        _this.handleChange(nextState);
        return true;
      }
      return false;
    };

    _this.state = {
      editorState: null
    };
    return _this;
  }

  RichEditor.prototype.componentWillMount = function componentWillMount() {
    this.setEditorState(this.props.value);
  };

  RichEditor.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    this.setEditorState(nextProps.value);
  };

  RichEditor.prototype.setEditorState = function setEditorState(value) {

    var contentState = void 0;

    // 接收的是 RAW
    if ((0, _isObject3.default)(value)) {
      contentState = (0, _draftJs.convertFromRaw)(value);
    } else {
      contentState = _draftJs.ContentState.createFromText('' + value);
    }

    this.setState({
      editorState: contentState ? _draftJs.EditorState.createWithContent(contentState, _decorator2.default) : _draftJs.EditorState.createEmpty(_decorator2.default)
    });
  };

  RichEditor.prototype.render = function render() {
    var editorState = this.state.editorState,
        _props = this.props,
        placeholder = _props.placeholder,
        toolbar = _props.toolbar,
        blockTypes = toolbar.blockTypes,
        inlineStyles = toolbar.inlineStyles,
        entity = toolbar.entity;


    return _react2.default.createElement(
      'div',
      { className: _editor2.default.root },
      blockTypes ? _react2.default.createElement(_blockTypes.BlockTypesControls, {
        types: blockTypes,
        editorState: editorState,
        onToggle: this.handleChange }) : null,
      inlineStyles ? _react2.default.createElement(_inlineStyle.InlineStylesControls, {
        styles: inlineStyles,
        editorState: editorState,
        onToggle: this.handleChange }) : null,
      entity && entity.includes('link') ? _react2.default.createElement(_link.LinkControls, {
        editorState: editorState,
        onToggle: this.handleChange }) : null,
      _react2.default.createElement(
        'div',
        { className: _editor2.default.editor, onClick: this.focus },
        _react2.default.createElement(_draftJs.Editor, {
          editorState: editorState,
          placeholder: placeholder,
          onChange: this.handleChange,
          customStyleMap: _inlineStyle.customStyles,
          blockStyleFn: _blockTypes.blockClassName,
          blockRenderMap: _blockTypes.blockRenderMap,
          blockRendererFn: _blockTypes.blockRenderer,
          handleKeyCommand: this.handleKeyCommand })
      )
    );
  };

  return RichEditor;
}(_react2.default.Component), _class.propTypes = {
  value: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.number, _react2.default.PropTypes.object]),
  onChange: _react2.default.PropTypes.func,
  placeholder: _react2.default.PropTypes.string,
  toolbar: _react2.default.PropTypes.shape({
    blockTypes: _react2.default.PropTypes.arrayOf(_react2.default.PropTypes.string),
    inlineStyles: _react2.default.PropTypes.arrayOf(_react2.default.PropTypes.string),
    entity: _react2.default.PropTypes.arrayOf(_react2.default.PropTypes.string)
  })
}, _class.defaultProps = {
  value: ''
}, _temp);
exports.default = RichEditor;
module.exports = exports['default'];