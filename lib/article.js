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

var _class, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _draftJs = require('draft-js');

var _blockTypes = require('./components/block-types');

var _decorator = require('./components/decorator');

var _decorator2 = _interopRequireDefault(_decorator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Article = (_temp = _class = function (_React$Component) {
  (0, _inherits3.default)(Article, _React$Component);

  function Article() {
    (0, _classCallCheck3.default)(this, Article);
    return (0, _possibleConstructorReturn3.default)(this, _React$Component.apply(this, arguments));
  }

  Article.prototype.render = function render() {

    if (this.props.content) {
      var isString = Object.prototype.toString.call(this.props.content) === '[object String]',
          editorState = _draftJs.EditorState.createWithContent(isString ? _draftJs.ContentState.createFromText(this.props.content) : (0, _draftJs.convertFromRaw)(this.props.content), _decorator2.default);

      return _react2.default.createElement(
        'div',
        { className: 'RichEditor-editor Draft-article' },
        _react2.default.createElement(_draftJs.Editor, {
          readOnly: true,
          editorState: editorState,
          customStyleMap: customStyles,
          blockRenderMap: blockRenderMap,
          blockRendererFn: _blockTypes.blockRenderer,
          blockStyleFn: _blockTypes.getBlockClassName })
      );
    }

    return null;
  };

  return Article;
}(_react2.default.Component), _class.propsTypes = {
  content: _react2.default.PropTypes.object
}, _temp);
exports.default = Article;
module.exports = exports['default'];