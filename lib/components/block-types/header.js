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
    headers = {
  'header-one': function headerOne(props) {
    return _react2.default.createElement(
      'h1',
      null,
      props.children
    );
  },
  'header-two': function headerTwo(props) {
    return _react2.default.createElement(
      'h2',
      null,
      props.children
    );
  },
  'header-three': function headerThree(props) {
    return _react2.default.createElement(
      'h3',
      null,
      props.children
    );
  },
  'header-four': function headerFour(props) {
    return _react2.default.createElement(
      'h4',
      null,
      props.children
    );
  },
  'header-five': function headerFive(props) {
    return _react2.default.createElement(
      'h5',
      null,
      props.children
    );
  },
  'header-six': function headerSix(props) {
    return _react2.default.createElement(
      'h6',
      null,
      props.children
    );
  }
};

function Header(props) {

  function handleClick(_ref) {
    var key = _ref.key;

    props.onChange(key);
  }

  return _react2.default.createElement(
    _menu2.default,
    { selectedKeys: [props.select], onClick: handleClick },
    (0, _keys2.default)(headers).map(function (name) {
      var Head = headers[name];
      return _react2.default.createElement(
        MenuItem,
        { key: name },
        _react2.default.createElement(
          Head,
          null,
          'Header'
        )
      );
    })
  );
}

Header.propTypes = {
  select: _react2.default.PropTypes.string,
  onChange: _react2.default.PropTypes.func
};

exports.default = Header;
module.exports = exports['default'];