'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _style2 = require('antd/lib/popover/style');

var _popover = require('antd/lib/popover');

var _popover2 = _interopRequireDefault(_popover);

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _button = require('./button');

var _button2 = _interopRequireDefault(_button);

var _config = require('../config');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ButtonPopover = (_temp = _class = function (_React$Component) {
  _inherits(ButtonPopover, _React$Component);

  function ButtonPopover(props) {
    _classCallCheck(this, ButtonPopover);

    var _this = _possibleConstructorReturn(this, (ButtonPopover.__proto__ || Object.getPrototypeOf(ButtonPopover)).call(this, props));

    _this.handleToggle = function () {
      _this.setState({
        visible: !_this.state.visible
      });
    };

    _this.handleVisibleChange = function (visible) {

      // 关闭气泡
      if (_this.state.visible && !visible) {
        _this.setState({
          visible: false
        });
      }
    };

    _this.state = {
      visible: false
    };
    return _this;
  }

  _createClass(ButtonPopover, [{
    key: 'render',
    value: function render() {

      return _react2.default.createElement(
        _popover2.default,
        {
          placement: 'top',
          visible: this.state.visible,
          content: this.props.children,
          overlayClassName: _config.prefixCls + '-popover',
          onVisibleChange: this.handleVisibleChange },
        _react2.default.createElement(_button2.default, {
          title: this.props.title,
          label: this.props.label,
          active: this.props.active,
          onToggle: this.handleToggle,
          disabled: this.props.disabled })
      );
    }
  }]);

  return ButtonPopover;
}(_react2.default.Component), _class.propTypes = {
  active: _propTypes2.default.bool,
  disabled: _propTypes2.default.bool,
  title: _propTypes2.default.string,
  children: _propTypes2.default.element,
  label: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.element]).isRequired,

  // block type
  id: _propTypes2.default.string.isRequired
}, _temp);
exports.default = ButtonPopover;
module.exports = exports['default'];