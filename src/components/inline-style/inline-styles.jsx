

import React from 'react';
import { Map } from 'Immutable';
import Icon from '../icons';
import { FontSize } from './font-size';
import { FontFamily } from './font-family';
import { Color } from './color';
import Button from '../button';
import ButtonPopover from '../button-popover';
// import styles from './block-types.less';
import { DefaultDraftInlineStyle } from 'draft-js';


export const inlineStyles = {

  // 系统默认
  BOLD: {
    label: <Icon type="fontbold" />,
    title: '粗体',
    Element: Button
  },
  ITALIC: {
    title: '斜体',
    label: <Icon type="fontitalics" />,
    Element: Button
  },
  UNDERLINE: {
    title: '下划线',
    label: <Icon type="fontunderline" />,
    Element: Button
  },
  CODE: {
    title: '行内代码块',
    label: 'Monospace',
    Element: Button
  },
  STRIKETHROUGH: {
    title: '删除线',
    label: <Icon type="fontstrikethrough" />,
    Element: Button
  },

  // 自定义
  FONTFAMILY: {
    title: '字体',
    label: <Icon type="font" />,
    Element: function ( props ) {
      return (
        <ButtonPopover {...props}>
          <FontFamily
            select={props.type}
            onChange={props.onToggle} />
        </ButtonPopover>
      );
    }
  },
  FONTSIZE: {
    title: '字体大小',
    label: <Icon type="fontsize" />,
    Element: function ( props ) {
      return (
        <ButtonPopover {...props}>
          <FontSize
            select={props.type}
            onChange={props.onToggle} />
        </ButtonPopover>
      );
    }
  },
  FONTCOLOR: {
    label: <Icon type="fontcolormerge" />,
    title: '字体颜色',
    Element: function ( props ) {
      return (
        <ButtonPopover {...props}>
          <Color
            type="color"
            select={props.type}
            onChange={props.onToggle} />
        </ButtonPopover>
      );
    }
  },
  FONTBACKGROUNTCOLOR: {
    label: <Icon type="fontbackground" />,
    title: '字体背景色',
    Element: function ( props ) {
      return (
        <ButtonPopover {...props}>
          <Color
            type="backgroundcolor"
            select={props.type}
            onChange={props.onToggle} />
        </ButtonPopover>
      );
    }
  }
};