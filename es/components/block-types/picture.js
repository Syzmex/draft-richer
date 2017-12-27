'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ArticlePicture = exports.EditorPicture = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp2, _class2, _temp4;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _whatitis = require('whatitis');

var _whatitis2 = _interopRequireDefault(_whatitis);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames3 = require('classnames');

var _classnames4 = _interopRequireDefault(_classnames3);

var _draftJs = require('draft-js');

var _reactResizableBox = require('react-resizable-box');

var _reactResizableBox2 = _interopRequireDefault(_reactResizableBox);

var _css = require('rc-util/lib/Dom/css');

var _button = require('../button');

var _button2 = _interopRequireDefault(_button);

var _config = require('../../config');

var _imgLoader = require('../../utils/img-loader');

var _imgLoader2 = _interopRequireDefault(_imgLoader);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var EditorPicture = exports.EditorPicture = (_temp2 = _class = function (_React$Component) {
  _inherits(EditorPicture, _React$Component);

  function EditorPicture() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, EditorPicture);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = EditorPicture.__proto__ || Object.getPrototypeOf(EditorPicture)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      unit: '%',
      showPanel: false,
      enable: {
        top: false,
        right: false,
        bottom: false,
        left: false,
        topRight: false,
        bottomRight: false,
        bottomLeft: false,
        topLeft: false
      }
    }, _this.handleResize = function (event_, direction_, refToElement, delta_) {
      var unit = _this.state.unit;

      var parentWidth = (0, _css.get)(_this.wrap, 'width');
      if (unit === '%') {
        _this.updateData({
          width: Math.round(Math.min(1, (0, _css.get)(refToElement, 'width') / parentWidth) * 100) + '%',
          height: 'auto'
        });
      } else {
        _this.updateData({
          width: Math.min((0, _css.get)(refToElement, 'width'), parentWidth),
          height: (0, _css.get)(refToElement, 'height')
        });
      }
    }, _this.handleUnitChange = function () {
      // const { unit } = this.state;
      // const { width } = this.props;
      // const parentWidth = get( this.wrap, 'width' );
      // if ( unit === '%' ) {
      //   this.updateData({
      //     width: Math.round( parseFloat( width.replace( /%$/, '' )) / 100 * parentWidth )
      //   });
      //   this.setState({ unit: 'px' });
      // } else {
      //   this.updateData({
      //     width: `${Math.round( Math.min( 1, width / parentWidth ) * 100 )}%`
      //   });
      //   this.setState({ unit: '%' });
      // }
    }, _this.handleAlignChange = function (align) {
      var unit = _this.props.unit;
      var alignProp = _this.props.align;

      if (alignProp === align) {
        _this.updateData({ align: '' });
      } else {
        _this.updateData({ align: align });
        if (unit === '%' && (align === 'left' || align === 'right')) {
          _this.handleUnitChange();
        }
      }
    }, _this.getSize = function (img, width) {
      var unit = _this.state.unit;

      var rate = img.height / img.width;
      var parentWidth = (0, _css.get)(_this.wrap, 'width');
      // width = '%'
      if (_whatitis2.default.String(width) && /%$/.test(width)) {
        if (unit === '%') {
          return {
            width: width,
            height: 'auto'
          };
        }
        return {
          width: Math.round(parseFloat(width.replace(/%$/, '')) / 100 * parentWidth),
          height: 'auto'
        };

        // width = 'px'
      } else if (_whatitis2.default.Number(width) || _whatitis2.default.String(width) && /px$/.test(width)) {
        var nWidth = void 0;
        if (_whatitis2.default.String(width) && /px$/.test(width)) {
          nWidth = parseFloat(width.replace(/px$/, ''));
        } else {
          nWidth = width;
        }
        if (unit === '%') {
          return {
            width: Math.round(Math.min(1, nWidth / parentWidth) * 100) + '%',
            height: 'auto'
          };
        }
        return {
          width: Math.min(nWidth, parentWidth),
          height: Math.min(rate * nWidth, rate * parentWidth)
        };
      }

      // width = ''
      if (unit === '%') {
        return {
          width: Math.round(Math.min(1, img.width / parentWidth) * 100) + '%',
          height: 'auto'
        };
      }
      return {
        width: Math.min(img.width, parentWidth),
        height: Math.min(img.height, rate * parentWidth)
      };
    }, _this.updateData = function (data) {
      var _this$props = _this.props,
          contentState = _this$props.contentState,
          entityKey = _this$props.entityKey,
          setEditorState = _this$props.setEditorState,
          getEditorState = _this$props.getEditorState;

      var newContentState = contentState.mergeEntityData(entityKey, data);
      var newEditorState = _draftJs.EditorState.set(getEditorState(), { currentContent: newContentState });
      setEditorState(newEditorState);
    }, _this.preLoad = function (props) {
      var size = void 0;
      var name = props.name,
          hashname = props.hashname,
          width = props.width,
          onCreate = props.onCreate,
          fileurl = props.fileurl;

      var url = fileurl({ hashname: hashname });
      (0, _imgLoader2.default)(url, function (img) {
        size = _this.getSize(img, width);
        _this.resizable.updateSize({
          width: size.width,
          height: size.height
        });
        _this.updateData({
          width: size.width,
          height: size.height
        });
      }, function () {
        if (onCreate) {
          onCreate({ name: name, hashname: hashname });
        }
        _this.resizable.updateSize({
          width: size.width,
          height: 'auto'
        });
        _this.updateData({
          width: size.width,
          height: size.height
        });
        _this.setState({
          showPanel: true,
          enable: {
            top: false,
            right: true,
            bottom: true,
            left: true,
            topRight: false,
            bottomRight: true,
            bottomLeft: true,
            topLeft: false
          }
        });
      });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  // static defaultProps = {
  //   url: '//img3.tbcdn.cn/tfscom/TB16AZoKpXXXXaTXFXXSutbFXXX.jpg_200x200.jpg'
  // }

  _createClass(EditorPicture, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _props = this.props,
          name = _props.name,
          hashname = _props.hashname;

      if (name && hashname) {
        this.preLoad(this.props);
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (!this.props.hashname && nextProps.hashname) {
        this.preLoad(nextProps);
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      var _props2 = this.props,
          name = _props2.name,
          hashname = _props2.hashname;

      if (this.props.onDelete) {
        this.props.onDelete({ name: name, hashname: hashname });
      }
      if (this.props.abort) {
        this.props.abort();
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _classnames,
          _this2 = this;

      var _state = this.state,
          enable = _state.enable,
          showPanel = _state.showPanel;
      var _props3 = this.props,
          fileurl = _props3.fileurl,
          name = _props3.name,
          hashname = _props3.hashname,
          width = _props3.width,
          align = _props3.align,
          percent = _props3.percent,
          error = _props3.error;

      var url = hashname ? fileurl({ hashname: hashname }) : '';
      var clsname = (0, _classnames4.default)(_config.prefixCls + '-picture', (_classnames = {}, _defineProperty(_classnames, _config.prefixCls + '-picture-left', align === 'left'), _defineProperty(_classnames, _config.prefixCls + '-picture-center', align === 'center'), _defineProperty(_classnames, _config.prefixCls + '-picture-right', align === 'right'), _defineProperty(_classnames, _config.prefixCls + '-picture-inline', align === 'inline'), _defineProperty(_classnames, _config.prefixCls + '-picture-uploading', !hashname && !error), _defineProperty(_classnames, _config.prefixCls + '-picture-error', !!error), _classnames));
      var editpanel = _react2.default.createElement(
        'div',
        { className: _config.prefixCls + '-picture-panel' },
        _react2.default.createElement(_button2.default, {
          id: 'width',
          title: '\u5BBD\u5EA6',
          label: _whatitis2.default.Number(width) ? width + 'px' : width,
          onToggle: this.handleUnitChange })
      );
      return _react2.default.createElement(
        'div',
        { className: clsname, ref: function ref(c) {
            if (c) _this2.wrap = c;
          } },
        hashname && !error ? _react2.default.createElement(
          _reactResizableBox2.default,
          {
            height: 'auto',
            width: width,
            enable: enable,
            style: { maxWidth: '100%' },
            onResizeStop: this.handleResize,
            ref: function ref(c) {
              if (c) _this2.resizable = c;
            } },
          _react2.default.createElement('img', { alt: name, src: url, style: { width: '100%', height: 'auto' } }),
          showPanel ? editpanel : null
        ) : null,
        !hashname && !error ? _react2.default.createElement(
          'div',
          { className: _config.prefixCls + '-picture-text' },
          '\u6B63\u5728\u4E0A\u4F20...',
          percent,
          '%'
        ) : null,
        !hashname && !error ? _react2.default.createElement('div', { className: _config.prefixCls + '-picture-progress', style: { width: percent + '%' } }) : null,
        !!error ? _react2.default.createElement(
          'div',
          { className: _config.prefixCls + '-picture-text' },
          error
        ) : null,
        !!error ? _react2.default.createElement('div', { className: _config.prefixCls + '-picture-progress' }) : null
      );
    }
  }]);

  return EditorPicture;
}(_react2.default.Component), _class.propTypes = {
  name: _propTypes2.default.string,
  hashname: _propTypes2.default.string,
  width: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string]),
  abort: _propTypes2.default.func,
  align: _propTypes2.default.string,
  percent: _propTypes2.default.number,
  error: _propTypes2.default.string,
  onDelete: _propTypes2.default.func,
  onCreate: _propTypes2.default.func
}, _temp2);
var ArticlePicture = exports.ArticlePicture = (_temp4 = _class2 = function (_React$Component2) {
  _inherits(ArticlePicture, _React$Component2);

  function ArticlePicture() {
    var _ref2;

    var _temp3, _this3, _ret2;

    _classCallCheck(this, ArticlePicture);

    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    return _ret2 = (_temp3 = (_this3 = _possibleConstructorReturn(this, (_ref2 = ArticlePicture.__proto__ || Object.getPrototypeOf(ArticlePicture)).call.apply(_ref2, [this].concat(args))), _this3), _this3.state = {
      url: ''
    }, _temp3), _possibleConstructorReturn(_this3, _ret2);
  }

  _createClass(ArticlePicture, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var _props4 = this.props,
          fileurl = _props4.fileurl,
          hashname = _props4.hashname;

      if (hashname) {
        var url = fileurl({ hashname: hashname });
        this.state.url = url;
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var fileurl = nextProps.fileurl,
          hashname = nextProps.hashname;

      if (hashname && !this.props.hashname) {
        var url = fileurl({ hashname: hashname });
        this.setState({ url: url });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _classnames2;

      var url = this.state.url;
      var _props5 = this.props,
          name = _props5.name,
          width = _props5.width,
          align = _props5.align;

      var clsname = (0, _classnames4.default)(_config.prefixCls + '-picture', (_classnames2 = {}, _defineProperty(_classnames2, _config.prefixCls + '-picture-left', align === 'left'), _defineProperty(_classnames2, _config.prefixCls + '-picture-center', align === 'center'), _defineProperty(_classnames2, _config.prefixCls + '-picture-right', align === 'right'), _defineProperty(_classnames2, _config.prefixCls + '-picture-inline', align === 'inline'), _classnames2));
      return _react2.default.createElement(
        'div',
        { className: clsname, style: { width: width, height: 'auto', maxWidth: '100%' } },
        url ? _react2.default.createElement('img', { alt: name, src: url, style: { width: '100%', height: 'auto' } }) : null
      );
    }
  }]);

  return ArticlePicture;
}(_react2.default.Component), _class2.propTypes = {
  fileurl: _propTypes2.default.func
}, _temp4);