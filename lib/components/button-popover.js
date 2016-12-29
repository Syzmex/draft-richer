'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _style2 = require('antd/lib/popover/style');

var _popover = require('antd/lib/popover');

var _popover2 = _interopRequireDefault(_popover);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _class, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _button = require('./button');

var _button2 = _interopRequireDefault(_button);

var _buttonPopover = require('./button-popover.less');

var _buttonPopover2 = _interopRequireDefault(_buttonPopover);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ButtonPopover = (_temp = _class = function (_React$Component) {
  (0, _inherits3.default)(ButtonPopover, _React$Component);

  function ButtonPopover(props) {
    (0, _classCallCheck3.default)(this, ButtonPopover);

    var _this = (0, _possibleConstructorReturn3.default)(this, _React$Component.call(this, props));

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

  ButtonPopover.prototype.render = function render() {

    return _react2.default.createElement(
      _popover2.default,
      {
        placement: 'top',
        overlayClassName: _buttonPopover2.default.popover,
        visible: this.state.visible,
        content: this.props.children,
        onVisibleChange: this.handleVisibleChange },
      _react2.default.createElement(_button2.default, {
        title: this.props.title,
        label: this.props.label,
        active: this.props.active,
        onToggle: this.handleToggle,
        disabled: this.props.disabled })
    );
  };

  return ButtonPopover;
}(_react2.default.Component), _class.propTypes = {
  active: _react2.default.PropTypes.bool,
  disabled: _react2.default.PropTypes.bool,
  title: _react2.default.PropTypes.string,
  children: _react2.default.PropTypes.element,
  label: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.element]).isRequired,

  // block type
  id: _react2.default.PropTypes.string.isRequired
}, _temp);
exports.default = ButtonPopover;
module.exports = exports['default'];