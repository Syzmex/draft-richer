

import React from 'react';
import { Map } from 'Immutable';
import Icon from '../icons';
import Header from './header';
import Button from '../button';
import ButtonPopover from '../button-popover';
import styles from '../toolbar.less';
import { DefaultDraftBlockRenderMap } from 'draft-js';


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
  },

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
    Element: function ( props ) {
      return (
        <ButtonPopover {...props}>
          <Header
            select={props.id}
            onChange={props.onToggle} />
        </ButtonPopover>
      );
    }
  }
};


export const blockRenderMap = DefaultDraftBlockRenderMap.merge( Map( {

  // 这里添加自定义的 blocktype
} ) );


// 设置 blocktype 的样式
export function blockClassName ( block ) {
  switch ( block.getType() ) {
    case 'blockquote':
      return styles.blockquote;
    default:
      return null;
  }
};


// blocktype 组件渲染函数
export function blockRenderer ( contentBlock ) {
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
};

