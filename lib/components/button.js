'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _button = require('./button.less');

var _button2 = _interopRequireDefault(_button);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Button(props) {
  var _classNames;

  var

  // 样式组合
  className = (0, _classnames2.default)(_button2.default.button, (_classNames = {}, (0, _defineProperty3.default)(_classNames, _button2.default.active, props.active), (0, _defineProperty3.default)(_classNames, _button2.default.disabled, props.disabled), _classNames)),


  // 点击回调函数
  handleMouseDown = function handleMouseDown(e) {
    e.preventDefault();
    if (!props.disabled && props.onToggle) {
      props.onToggle(props.id);
    }
  };

  return _react2.default.createElement(
    'span',
    {
      title: props.title,
      className: className,
      onMouseDown: handleMouseDown },
    props.label
  );
}

Button.propTypes = {
  active: _react2.default.PropTypes.bool,
  disabled: _react2.default.PropTypes.bool,
  onToggle: _react2.default.PropTypes.func,
  title: _react2.default.PropTypes.string,
  id: _react2.default.PropTypes.string,
  label: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.element]).isRequired
};

exports.default = Button;
module.exports = exports['default'];