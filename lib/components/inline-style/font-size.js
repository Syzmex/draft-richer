'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _style2 = require('antd/lib/menu/style');

var _menu = require('antd/lib/menu');

var _menu2 = _interopRequireDefault(_menu);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MenuItem = _menu2.default.Item,
    fontSizeStyles = [8, 9, 10, 11, 12, 13, 14, 16, 18, 20, 22, 24, 26, 28, 36, 48, 72].reduce(function (styles, size) {
  styles[size] = { fontSize: size + 'px' };
  return styles;
}, {});

function FontSize(props) {

  function handleClick(_ref) {
    var key = _ref.key;

    props.onChange(key);
  }

  return _react2.default.createElement(
    _menu2.default,
    { selectedKeys: [props.select], onClick: handleClick },
    (0, _keys2.default)(fontSizeStyles).map(function (name) {
      return _react2.default.createElement(
        MenuItem,
        { key: name, style: fontSizeStyles[name] },
        name
      );
    })
  );
}

exports.default = {
  fontSizeStyles: fontSizeStyles,
  FontSize: FontSize
};
module.exports = exports['default'];