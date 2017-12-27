'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _style2 = require('antd/lib/menu/style');

var _menu = require('antd/lib/menu');

var _menu2 = _interopRequireDefault(_menu);

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _fontFamilyStyles = require('./font-family-styles');

var _fontFamilyStyles2 = _interopRequireDefault(_fontFamilyStyles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MenuItem = _menu2.default.Item;

function FontFamily(props) {

  function handleClick(_ref) {
    var key = _ref.key;

    props.onChange(key);
  }

  return _react2.default.createElement(
    _menu2.default,
    { selectedKeys: [props.select], onClick: handleClick },
    Object.keys(_fontFamilyStyles2.default).map(function (name) {
      return _react2.default.createElement(
        MenuItem,
        {
          key: name,
          style: _extends({ fontSize: '14px' }, _fontFamilyStyles2.default[name]) },
        name
      );
    })
  );
}

FontFamily.propTypes = {
  select: _propTypes2.default.string
  // onChange: PropTypes.func
};

exports.default = {
  fontFamilyStyles: _fontFamilyStyles2.default,
  FontFamily: FontFamily
};
module.exports = exports['default'];