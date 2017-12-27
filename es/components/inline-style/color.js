'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _colorStyles = require('./color-styles');

var _config = require('../../config');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import PropTypes from 'prop-types';
function Color(props) {

  function handleClick(key) {
    props.onChange(key);
  }

  return _react2.default.createElement(
    'div',
    null,
    Object.keys(_colorStyles.colors).map(function (colorName) {
      return _react2.default.createElement(
        'div',
        { key: colorName },
        _colorStyles.colors[colorName].list.map(function (rgb, index) {
          var sType = props.type === 'color' ? 'color' : 'backgroundColor',
              typeColors = props.type === 'color' ? _colorStyles.colorStyles : _colorStyles.backgroundColorStyles,
              key = sType + '#' + colorName + '#' + (index + 1);
          return _react2.default.createElement('span', {
            key: key,
            className: _config.prefixCls + '-color-button',
            title: _colorStyles.colors[colorName].label + '#' + (index + 1),
            style: { backgroundColor: typeColors[key][sType] },
            onMouseDown: function onMouseDown(e) {
              e.preventDefault();
              handleClick(key);
            } });
        })
      );
    })
  );
}

// Color.propTypes = {
//   type: PropTypes.string,
//   select: PropTypes.string,
//   onChange: PropTypes.func
// };


exports.default = {
  colorStyles: _colorStyles.colorStyles,
  backgroundColorStyles: _colorStyles.backgroundColorStyles,
  Color: Color
};
module.exports = exports['default'];