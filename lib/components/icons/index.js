'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _icons = require('./icons.css');

var _icons2 = _interopRequireDefault(_icons);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Icon(props) {
  return _react2.default.createElement('i', { className: _icons2.default.iconfont + ' ' + _icons2.default['icon-' + props.type] });
};

Icon.propTypes = {
  value: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.number, _react2.default.PropTypes.func]),
  onChange: _react2.default.PropTypes.func
};

exports.default = Icon;
module.exports = exports['default'];