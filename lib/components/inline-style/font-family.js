'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _style2 = require('antd/lib/menu/style');

var _menu = require('antd/lib/menu');

var _menu2 = _interopRequireDefault(_menu);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MenuItem = _menu2.default.Item,
    fontFamilyStyles = {
  '宋体': { fontFamily: 'SimSun,STSong' },
  '黑体': { fontFamily: 'SimHei,STHeiti' },
  '仿宋': { fontFamily: 'FangSong_GB2312,FangSong,STFangsong,STFangsong' },
  '楷体': { fontFamily: 'KaiTi_GB2312,KaiTi,STKaiti' },
  '隶书': { fontFamily: 'LiSu,STLiti,"Baoli SC","Libian SC"' },
  '幼圆': { fontFamily: 'YouYuan,"Yuanti SC"' },
  '微软雅黑': { fontFamily: '"Microsoft YaHei"' },
  'Arial': { fontFamily: 'arial,helvetica,sans-serif' },
  'Comic Sans MS': { fontFamily: '"comic sans ms",cursive' },
  'Courier New': { fontFamily: '"courier new",courier,monospace' },
  'Lucida Sans Unicode': { fontFamily: '"lucida sans unicode","lucida grande",sans-serif' },
  'Tahoma': { fontFamily: 'tahoma,geneva,sans-serif' },
  'Times New Roman': { fontFamily: '"times new roman",times,serif' },
  'Trebuchet MS': { fontFamily: '"trebuchet ms",helvetica,sans-serif' },
  'Verdana': { fontFamily: 'verdana,geneva,sans-serif' }
};

function FontFamily(props) {

  function handleClick(_ref) {
    var key = _ref.key;

    props.onChange(key);
  }

  return _react2.default.createElement(
    _menu2.default,
    { selectedKeys: [props.select], onClick: handleClick },
    (0, _keys2.default)(fontFamilyStyles).map(function (name) {
      return _react2.default.createElement(
        MenuItem,
        {
          key: name,
          style: (0, _extends3.default)({ fontSize: '14px' }, fontFamilyStyles[name]) },
        name
      );
    })
  );
}

FontFamily.propTypes = {
  select: _react2.default.PropTypes.string,
  onChange: _react2.default.PropTypes.func
};

exports.default = {
  fontFamilyStyles: fontFamilyStyles,
  FontFamily: FontFamily
};
module.exports = exports['default'];