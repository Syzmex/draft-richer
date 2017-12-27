'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.blockRenderMap = exports.articleBlockRenderer = exports.editorBlockRenderer = undefined;
exports.blockClassName = blockClassName;

var _immutable = require('immutable');

var _draftJs = require('draft-js');

var _atomic = require('./atomic');

var _config = require('../../config');

// blocktype 组件渲染函数
var editorBlockRenderer = exports.editorBlockRenderer = function editorBlockRenderer(blockPorps) {
  return function (contentBlock) {
    var type = contentBlock.getType();
    if (type === 'atomic') {
      return {
        component: _atomic.EditorAtomic,
        editable: true,
        props: blockPorps
      };
    }
    return null;
  };
};

var articleBlockRenderer = exports.articleBlockRenderer = function articleBlockRenderer(blockPorps) {
  return function (contentBlock) {
    var type = contentBlock.getType();
    if (type === 'atomic') {
      return {
        component: _atomic.ArticleAtomic,
        editable: false,
        props: blockPorps
      };
    }
    return null;
  };
};

var blockRenderMap = exports.blockRenderMap = _draftJs.DefaultDraftBlockRenderMap.merge((0, _immutable.Map)({
  'code-block': {
    element: 'pre'
  }
}));

// 设置 blocktype 的样式
function blockClassName(block) {
  switch (block.getType()) {
    case 'blockquote':
      return _config.prefixCls + '-blockquote';
    case 'code-block':
      return _config.prefixCls + '-code';
    default:
      return null;
  }
}