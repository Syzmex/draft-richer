'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _addEventListener = require('rc-util/lib/Dom/addEventListener');

var _addEventListener2 = _interopRequireDefault(_addEventListener);

var _utils = require('../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function getScroll(w, top) {
  var ret = w['page' + (top ? 'Y' : 'X') + 'Offset'];
  var method = 'scroll' + (top ? 'Top' : 'Left');
  if (typeof ret !== 'number') {
    var d = w.document;
    // ie6,7,8 standard mode
    ret = d.documentElement[method];
    if (typeof ret !== 'number') {
      // quirks mode
      ret = d.body[method];
    }
  }
  return ret;
}

function getOffset(element) {
  var body = document.body;
  var rect = element.getBoundingClientRect();
  var clientTop = element.clientTop || body.clientTop || 0;
  var clientLeft = element.clientLeft || body.clientLeft || 0;
  var scrollTop = getScroll(window, true);
  var scrollLeft = getScroll(window);

  return {
    top: rect.top + scrollTop - clientTop,
    left: rect.left + scrollLeft - clientLeft
  };
}

var Affix = (_temp = _class = function (_React$Component) {
  _inherits(Affix, _React$Component);

  function Affix(props) {
    _classCallCheck(this, Affix);

    var _this = _possibleConstructorReturn(this, (Affix.__proto__ || Object.getPrototypeOf(Affix)).call(this, props));

    _this.handleScroll = function (e) {
      var _this$props = _this.props,
          offsetTop = _this$props.offsetTop,
          offsetBottom = _this$props.offsetBottom,
          offset = _this$props.offset;

      var scrollTop = getScroll(window, true);
      var scrollLeft = getScroll(window);
      var elem = _reactDom2.default.findDOMNode(_this);
      var elemOffset = getOffset(elem);
      var boxSize = {
        width: elem.offsetWidth,
        height: elem.offsetHeight
      };
      var elemSize = {
        width: _reactDom2.default.findDOMNode(_this.refs.fixedNode).offsetWidth,
        height: _reactDom2.default.findDOMNode(_this.refs.fixedNode).offsetHeight
      };

      var offsetMode = {};
      if (typeof offsetTop !== 'number' && typeof offsetBottom !== 'number') {
        offsetMode.top = true;
        offsetTop = 0;
      } else {
        offsetMode.top = typeof offsetTop === 'number';
        offsetMode.bottom = typeof offsetBottom === 'number';
      }

      if (scrollTop > elemOffset.top - offsetTop && offsetMode.top) {
        // Fixed Top
        // rainx 运行窗口变化改变 left 值
        if (!_this.state.affixStyle || elemOffset.left - scrollLeft !== _this.state.affixStyle.left || e.type === 'resize') {
          _this.setState({
            affixStyle: {
              position: 'fixed',
              top: offsetTop,
              left: elemOffset.left - scrollLeft,
              width: boxSize.width + 'px'
            },
            elemSize: {
              width: elemSize.width + 'px',
              height: elemSize.height + 'px'
            }
          });
        }
      } else if (scrollTop < elemOffset.top + elemSize.height + offsetBottom - window.innerHeight && offsetMode.bottom) {
        // Fixed Bottom
        // rainx 运行窗口变化改变 left 值
        if (!_this.state.affixStyle || e.type === 'resize') {
          _this.setState({
            affixStyle: {
              position: 'fixed',
              bottom: offsetBottom,
              left: elemOffset.left - scrollLeft,
              width: boxSize.width + 'px'
            },
            elemSize: {
              width: elemSize.width + 'px',
              height: elemSize.height + 'px'
            }
          });
        }
      } else if (_this.state.affixStyle) {
        _this.setState({
          affixStyle: null,
          elemSize: null
        });
      }
    };

    _this.state = {
      affixStyle: null,
      elemSize: null
    };
    return _this;
  }

  _createClass(Affix, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.animFrame = (0, _utils.requestAnimFrame)(this.handleScroll);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this.animFrame) {
        this.animFrame.cancel();
        this.animFrame = null;
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          offsetTop = _props.offsetTop,
          offsetBottom = _props.offsetBottom,
          props = _objectWithoutProperties(_props, ['offsetTop', 'offsetBottom']);

      var className = (0, _classnames2.default)({
        'ant-affix': this.state.affixStyle
      });
      // rainx 保持原有的占用高度
      var size = this.state.elemSize ? {
        // width: this.state.elemSize.width,
        height: this.state.elemSize.height
      } : {};

      return _react2.default.createElement(
        'div',
        _extends({}, props, { style: size }),
        _react2.default.createElement(
          'div',
          { className: className, ref: 'fixedNode', style: this.state.affixStyle },
          this.props.children
        )
      );
    }
  }]);

  return Affix;
}(_react2.default.Component), _class.propTypes = {
  target: _propTypes2.default.element,
  offsetTop: _propTypes2.default.number,
  offsetBottom: _propTypes2.default.number
}, _temp);
exports.default = Affix;
module.exports = exports['default'];