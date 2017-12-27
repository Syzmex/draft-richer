'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _style2 = require('antd/lib/menu/style');

var _menu = require('antd/lib/menu');

var _menu2 = _interopRequireDefault(_menu);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _fontSizeStyles = require('./font-size-styles');

var _fontSizeStyles2 = _interopRequireDefault(_fontSizeStyles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MenuItem = _menu2.default.Item;

function FontSize(props) {

  function handleClick(_ref) {
    var key = _ref.key;

    props.onChange(key);
  }

  return _react2.default.createElement(
    _menu2.default,
    { selectedKeys: [props.select], onClick: handleClick },
    Object.keys(_fontSizeStyles2.default).map(function (name) {
      return _react2.default.createElement(
        MenuItem,
        { key: name, style: _fontSizeStyles2.default[name] },
        name
      );
    })
  );
}

exports.default = {
  fontSizeStyles: _fontSizeStyles2.default,
  FontSize: FontSize
};
module.exports = exports['default'];