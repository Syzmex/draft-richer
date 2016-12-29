'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.blockRenderMap = exports.blockTypes = undefined;
exports.blockClassName = blockClassName;
exports.blockRenderer = blockRenderer;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Immutable = require('Immutable');

var _icons = require('../icons');

var _icons2 = _interopRequireDefault(_icons);

var _header = require('./header');

var _header2 = _interopRequireDefault(_header);

var _button = require('../button');

var _button2 = _interopRequireDefault(_button);

var _buttonPopover = require('../button-popover');

var _buttonPopover2 = _interopRequireDefault(_buttonPopover);

var _toolbar = require('../toolbar.less');

var _toolbar2 = _interopRequireDefault(_toolbar);

var _draftJs = require('draft-js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Draft.DefaultDraftBlockRenderMap
 * <h1/>  header-one
 * <h2/> header-two
 * <h3/> header-three
 * <h4/> header-four
 * <h5/> header-five
 * <h6/> header-six
 * <h6/> header-six
 * <blockquote/> blockquote
 * <pre/>  code-block
 * <figure/> atomic
 * <li/> unordered-list-item,ordered-list-item**
 * <div/>  unstyled*
 * 是默认的 blocktype 列表
 * 自定义的 blocktype 必须在此列表中定义
 *
 */

// 按钮配置
var blockTypes = exports.blockTypes = {

  // 自定义
  header: {
    type: ['header-one', 'header-two', 'header-three', 'header-four', 'header-five', 'header-six'],
    label: _react2.default.createElement(_icons2.default, { type: 'header' }),
    title: '标题',
    Element: function Element(props) {
      return _react2.default.createElement(
        _buttonPopover2.default,
        props,
        _react2.default.createElement(_header2.default, {
          select: props.id,
          onChange: props.onToggle })
      );
    }
  },
  blockquote: {
    type: 'blockquote',
    label: _react2.default.createElement(_icons2.default, { type: 'blockquote' }),
    title: '引用',
    Element: _button2.default
  },
  'unordered-list-item': {
    type: 'unordered-list-item',
    label: _react2.default.createElement(_icons2.default, { type: 'listalt' }),
    title: '无序列表',
    Element: _button2.default
  },
  'ordered-list-item': {
    type: 'ordered-list-item',
    label: _react2.default.createElement(_icons2.default, { type: 'listol' }),
    title: '有序列表',
    Element: _button2.default
  },
  'code-block': {
    type: 'code-block',
    label: _react2.default.createElement(_icons2.default, { type: 'script' }),
    title: '代码块',
    Element: _button2.default
  }
};

var blockRenderMap = exports.blockRenderMap = _draftJs.DefaultDraftBlockRenderMap.merge((0, _Immutable.Map)({

  // 这里添加自定义的 blocktype
}));

// 设置 blocktype 的样式
function blockClassName(block) {
  switch (block.getType()) {
    case 'blockquote':
      return _toolbar2.default.blockquote;
    default:
      return null;
  }
}

// blocktype 组件渲染函数
function blockRenderer(contentBlock) {
  // const type = contentBlock.getType();
  // if ( type === 'atomic' ) {
  //   return {
  //     component: MediaComponent,
  //     editable: false,
  //     props: {
  //       foo: 'bar',
  //     }
  //   };
  // }
}