

import React from 'react';
import { Map } from 'immutable';
import { DefaultDraftBlockRenderMap } from 'draft-js';
import Icon from '../icons';
import Header from './header';
import Button from '../button';
import { EditorAtomic, ArticleAtomic } from './atomic';
import ButtonPopover from '../button-popover';
import { prefixCls } from '../../config';


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
export const blockTypes = {

  // 自定义
  header: {
    type: [
      'header-one',
      'header-two',
      'header-three',
      'header-four',
      'header-five',
      'header-six'
    ],
    label: <Icon type="header" />,
    title: '标题',
    Element( props ) {
      return (
        <ButtonPopover {...props}>
          <Header
            select={props.id}
            onChange={props.onToggle} />
        </ButtonPopover>
      );
    }
  },
  blockquote: {
    type: 'blockquote',
    label: <Icon type="blockquote" />,
    title: '引用',
    Element: Button
  },
  'unordered-list-item': {
    type: 'unordered-list-item',
    label: <Icon type="listalt" />,
    title: '无序列表',
    Element: Button
  },
  'ordered-list-item': {
    type: 'ordered-list-item',
    label: <Icon type="listol" />,
    title: '有序列表',
    Element: Button
  },
  'code-block': {
    type: 'code-block',
    label: <Icon type="script" />,
    title: '代码块',
    Element: Button
  }
};


export const blockRenderMap = DefaultDraftBlockRenderMap.merge( Map({
  'code-block': {
    element: 'pre'
  }
}));


// 设置 blocktype 的样式
export function blockClassName( block ) {
  switch ( block.getType()) {
    case 'blockquote':
      return `${prefixCls}-blockquote`;
    case 'code-block':
      return `${prefixCls}-code`;
    default:
      return null;
  }
}


// blocktype 组件渲染函数
export const editorBlockRenderer = ( blockPorps ) => ( contentBlock ) => {
  const type = contentBlock.getType();
  if ( type === 'atomic' ) {
    return {
      component: EditorAtomic,
      editable: true,
      props: blockPorps
    };
  }
  return null;
};

export const articleBlockRenderer = ( blockPorps ) => ( contentBlock ) => {
  const type = contentBlock.getType();
  if ( type === 'atomic' ) {
    return {
      component: ArticleAtomic,
      editable: false,
      props: blockPorps
    };
  }
  return null;
};

