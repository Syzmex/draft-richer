'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp2;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _omit = require('omit.js');

var _omit2 = _interopRequireDefault(_omit);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _draftJs = require('draft-js');

var _blockTypes = require('./components/block-types');

var _inlineStyle = require('./components/inline-style');

var _link = require('./components/link');

var _upload = require('./components/upload');

var _affix = require('./components/affix');

var _affix2 = _interopRequireDefault(_affix);

var _utils = require('./utils');

var _config = require('./config');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var preventDefault = function preventDefault(e) {
  return e.preventDefault();
};

var defaultToolbar = {
  blockTypes: ['header', 'code-block', 'blockquote', 'unordered-list-item', 'ordered-list-item'],
  inlineStyles: ['BOLD', 'ITALIC', 'UNDERLINE', 'STRIKETHROUGH', 'FONTFAMILY', 'FONTSIZE', 'FONTCOLOR', 'FONTBACKGROUNTCOLOR'],
  entity: ['link', 'picture']
};

function getEntities(_ref) {
  var entity = _ref.entity,
      uploadConfig = _ref.uploadConfig,
      getPost = _ref.getPost,
      props = _objectWithoutProperties(_ref, ['entity', 'uploadConfig', 'getPost']);

  return entity.map(function (key) {
    if (key === 'link') {
      return _react2.default.createElement(_link.LinkControls, _extends({ key: 'link' }, props));
    } else if (key === 'picture') {
      return _react2.default.createElement(_upload.PictureControls, _extends({ key: 'picture' }, uploadConfig, { getPost: getPost }, props));
    } else if (key === 'attachment') {
      return _react2.default.createElement(_upload.AttachmentControls, _extends({ key: 'attachment' }, uploadConfig, props));
    }
    return null;
  }).filter(function (entity) {
    return entity;
  });
}

var RichEditor = (_temp2 = _class = function (_React$Component) {
  _inherits(RichEditor, _React$Component);

  function RichEditor() {
    var _ref2;

    var _temp, _this, _ret;

    _classCallCheck(this, RichEditor);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref2 = RichEditor.__proto__ || Object.getPrototypeOf(RichEditor)).call.apply(_ref2, [this].concat(args))), _this), _this.state = {
      editorState: null
    }, _this.onTab = function (e) {
      var maxDepth = 4;
      _this.handleChange(_draftJs.RichUtils.onTab(e, _this.state.editorState, maxDepth));
    }, _this.handleChange = function (editorState) {
      if (_this.props.onChange) {
        _this.props.onChange(editorState);
      } else {
        _this.setState({ editorState: editorState });
      }
    }, _this.handleKeyCommand = function (command) {
      var editorState = _this.state.editorState;

      var nextState = _draftJs.RichUtils.handleKeyCommand(editorState, command);
      if (nextState) {
        _this.handleChange(nextState);
        return true;
      }
      return false;
    }, _this.handleFocus = function (e) {
      if (e.target === e.currentTarget) {
        if (e.type.toLowerCase() === 'mousedown') {
          preventDefault(e);
        } else {
          var editorState = _this.state.editorState;

          _this.handleChange(_draftJs.EditorState.moveFocusToEnd(editorState));
        }
      }
    }, _this.setDomEditorRef = function (editor) {
      _this.domEditor = editor;
    }, _this.getPost = function (post) {
      _this.postFiles = post;
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(RichEditor, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var _props = this.props,
          value = _props.value,
          defaultValue = _props.defaultValue;

      if (value) {
        this.setEditorState(value);
      } else if (defaultValue) {
        this.setEditorState(defaultValue);
      } else {
        this.setEditorState('');
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.value) {
        this.setEditorState(nextProps.value);
      } else if ((0, _utils.isES)(nextProps.defaultValue)) {
        this.setEditorState(nextProps.defaultValue);
      } else if (!this.props.defaultValue && nextProps.defaultValue) {
        this.setEditorState(nextProps.defaultValue);
      }
    }
  }, {
    key: 'setEditorState',
    value: function setEditorState(content) {
      this.state.editorState = (0, _utils.createEditorState)(content);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var editorState = this.state.editorState;
      var _props2 = this.props,
          placeholder = _props2.placeholder,
          tabIndex = _props2.tabIndex,
          toolbar = _props2.toolbar,
          uploadConfig = _props2.uploadConfig,
          className = _props2.className,
          component = _props2.component;
      var blockTypes = toolbar.blockTypes,
          inlineStyles = toolbar.inlineStyles,
          entity = toolbar.entity;

      var clsnames = (0, _classnames2.default)(_config.prefixCls + '-root ' + _config.prefixCls + '-cf', className);
      var props = (0, _omit2.default)(this.props, ['value', 'defaultValue', 'onChange', 'placeholder', 'toolbar', 'className', 'uploadConfig', 'component']);
      var blockPorps = {
        getEditorState: function getEditorState() {
          return editorState;
        },

        setEditorState: function setEditorState(editorState) {
          _this2.handleChange(editorState);
        },
        fileurl: uploadConfig.fileurl,
        component: component
      };
      return _react2.default.createElement(
        'div',
        _extends({ className: clsnames }, props),
        _react2.default.createElement(_affix2.default, null),
        _react2.default.createElement(
          'div',
          { className: _config.prefixCls + '-toolbar-wrap' },
          Object.keys(toolbar).map(function (key) {
            if (key === 'blockTypes') {
              return blockTypes && blockTypes.length ? _react2.default.createElement(_blockTypes.BlockTypesControls, {
                key: 'blockTypes',
                types: blockTypes,
                editorState: editorState,
                onToggle: _this2.handleChange }) : null;
            } else if (key === 'inlineStyles') {
              return inlineStyles && inlineStyles.length ? _react2.default.createElement(_inlineStyle.InlineStylesControls, {
                key: 'inlineStyles',
                styles: inlineStyles,
                editorState: editorState,
                onToggle: _this2.handleChange }) : null;
            } else if (key === 'entity') {
              return entity ? getEntities({
                entity: entity, editorState: editorState, uploadConfig: uploadConfig, getPost: _this2.getPost, onToggle: _this2.handleChange
              }) : null;
            }
            return null;
          }).filter(function (elem) {
            return elem;
          })
        ),
        _react2.default.createElement(
          'div',
          {
            className: _config.prefixCls + '-editor',
            onMouseDown: this.handleFocus,
            onClick: this.handleFocus },
          _react2.default.createElement('div', { className: _config.prefixCls + '-stay-bar' }),
          _react2.default.createElement(_draftJs.Editor
          // onBlur={() => {
          //   console.log('onBlur')
          // }}
          // onFocus={() => {
          //   console.log('onFocus')
          // }}
          , { onTab: this.onTab,
            tabIndex: tabIndex,
            editorState: editorState,
            placeholder: placeholder,
            ref: this.setDomEditorRef,
            onChange: this.handleChange,
            customStyleMap: _inlineStyle.customStyles,
            blockStyleFn: _blockTypes.blockClassName,
            handleDrop: function handleDrop(selection_, dataTransfer_, isInternal_) {
              return 'handled';
            },
            handlePastedFiles: function handlePastedFiles(files) {
              _this2.postFiles(files);
              return 'handled';
            },
            handleDroppedFiles: function handleDroppedFiles(selection_, files) {
              _this2.postFiles(files);
              return 'handled';
            },
            blockRenderMap: _blockTypes.blockRenderMap,
            handleKeyCommand: this.handleKeyCommand,
            blockRendererFn: (0, _blockTypes.editorBlockRenderer)(blockPorps) })
        )
      );
    }
  }]);

  return RichEditor;
}(_react2.default.Component), _class.propTypes = {
  tabIndex: _propTypes2.default.number,
  value: _propTypes2.default.instanceOf(_draftJs.EditorState),
  defaultValue: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number, _propTypes2.default.object]),
  onChange: _propTypes2.default.func,
  placeholder: _propTypes2.default.string,
  toolbar: _propTypes2.default.shape({
    blockTypes: _propTypes2.default.arrayOf(_propTypes2.default.string),
    inlineStyles: _propTypes2.default.arrayOf(_propTypes2.default.string),
    entity: _propTypes2.default.arrayOf(_propTypes2.default.string)
  }),
  // picture {
  //  onDelete, onCreate
  // }
  component: _propTypes2.default.object, // eslint-disable-line
  uploadConfig: _propTypes2.default.shape({
    url: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.func]).isRequired,
    data: _propTypes2.default.oneOfType([_propTypes2.default.object, _propTypes2.default.func]),
    beforeResponse: _propTypes2.default.func
  })
}, _class.defaultProps = {
  component: {},
  uploadConfig: {},
  toolbar: defaultToolbar
}, _temp2);
exports.default = RichEditor;
module.exports = exports['default'];