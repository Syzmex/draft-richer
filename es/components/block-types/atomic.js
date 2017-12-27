'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ArticleAtomic = exports.EditorAtomic = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _omit = require('omit.js');

var _omit2 = _interopRequireDefault(_omit);

var _picture = require('./picture');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var EditorAtomic = exports.EditorAtomic = function (_React$Component) {
  _inherits(EditorAtomic, _React$Component);

  function EditorAtomic() {
    _classCallCheck(this, EditorAtomic);

    return _possibleConstructorReturn(this, (EditorAtomic.__proto__ || Object.getPrototypeOf(EditorAtomic)).apply(this, arguments));
  }

  _createClass(EditorAtomic, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          contentState = _props.contentState,
          block = _props.block,
          blockProps = _props.blockProps;

      var newProps = (0, _omit2.default)(blockProps, ['component']);
      var entityKey = block.getEntityAt(0);
      var entity = contentState.getEntity(entityKey);
      var data = entity.getData();
      var type = entity.getType();
      var media = null;
      if (type.toLowerCase() === 'audio') {
        media = _react2.default.createElement(Audio, { src: src });
      } else if (type.toLowerCase() === 'picture') {
        var picture = blockProps.component.picture;
        media = _react2.default.createElement(_picture.EditorPicture, _extends({}, data, newProps, picture, { contentState: contentState, entityKey: entityKey }));
      } else if (type.toLowerCase() === 'video') {
        media = _react2.default.createElement(Video, { src: src });
      }
      return media;
    }
  }]);

  return EditorAtomic;
}(_react2.default.Component);

var ArticleAtomic = exports.ArticleAtomic = function (_React$Component2) {
  _inherits(ArticleAtomic, _React$Component2);

  function ArticleAtomic() {
    _classCallCheck(this, ArticleAtomic);

    return _possibleConstructorReturn(this, (ArticleAtomic.__proto__ || Object.getPrototypeOf(ArticleAtomic)).apply(this, arguments));
  }

  _createClass(ArticleAtomic, [{
    key: 'render',
    value: function render() {
      var _props2 = this.props,
          contentState = _props2.contentState,
          block = _props2.block,
          blockProps = _props2.blockProps;

      var newProps = (0, _omit2.default)(blockProps, ['component']);
      var entityKey = block.getEntityAt(0);
      var entity = contentState.getEntity(entityKey);
      var data = entity.getData();
      var type = entity.getType();
      var media = null;
      if (type.toLowerCase() === 'audio') {
        media = _react2.default.createElement(Audio, { src: src });
      } else if (type.toLowerCase() === 'picture') {
        media = _react2.default.createElement(_picture.ArticlePicture, _extends({}, data, newProps));
      } else if (type.toLowerCase() === 'video') {
        media = _react2.default.createElement(Video, { src: src });
      }
      return media;
    }
  }]);

  return ArticleAtomic;
}(_react2.default.Component);