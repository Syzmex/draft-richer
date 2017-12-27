'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _config = require('../config');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Button(props) {

  // 样式组合
  var className = (0, _classnames2.default)(_config.prefixCls + '-button', {
    active: props.active,
    disabled: props.disabled
  });

  // 点击回调函数
  var handleMouseDown = function handleMouseDown(e) {
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
  active: _propTypes2.default.bool,
  title: _propTypes2.default.string,
  disabled: _propTypes2.default.bool,
  onToggle: _propTypes2.default.func,
  id: _propTypes2.default.string,
  label: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.element])
};

exports.default = Button;
module.exports = exports['default'];