'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _config = require('../../config');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Icon(props) {
  return _react2.default.createElement('i', { className: _config.prefixCls + '-iconfont icon-' + props.type });
}

// Icon.propTypes = {
//   value: PropTypes.oneOfType([
//     PropTypes.string,
//     PropTypes.number,
//     PropTypes.func
//   ]),
//   onChange: PropTypes.func
// };


// import PropTypes from 'prop-types';
exports.default = Icon;
module.exports = exports['default'];