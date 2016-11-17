

import React from 'react';
import { EditorState, RichUtils, Modifier } from 'draft-js';
import { colorStyles, backgroundColorStyles } from './color';
import { fontFamilyStyles } from './fontFamily';
import { fontSizeStyles } from './fontSize';
import StyleButton from '../styleButton';


// DefaultDraftInlineStyle
const INLINE_STYLES = {

  // 系统默认
  BOLD: {
    key: 'bold',
    style: 'BOLD',
    title: '粗体',
    label: <i className="iconfont icon-fontbold" />
  },
  ITALIC: {
    key: 'italic',
    style: 'ITALIC',
    title: '斜体',
    label: <i className="iconfont icon-fontitalics" />
  },
  UNDERLINE: {
    key: 'underline',
    style: 'UNDERLINE',
    title: '下划线',
    label: <i className="iconfont icon-fontunderline" />
  },
  CODE: {
    key: 'code',
    style: 'CODE',
    title: '行内代码块',
    label: 'Monospace'
  },
  STRIKETHROUGH: {
    key: 'strikethrough',
    style: 'STRIKETHROUGH',
    title: '删除线',
    label: <i className="iconfont icon-fontstrikethrough" />
  },

  // 自定义
  FONTFAMILY: {
    type: 'select',
    key: 'fontfamily',
    style: 'FONTFAMILY',
    title: '字体',
    label: <i className="iconfont icon-font" />
  },
  FONTSIZE: {
    type: 'select',
    key: 'fontsize',
    style: 'FONTSIZE',
    title: '字体大小',
    label: <i className="iconfont icon-fontsize" />
  },
  FONTCOLOR: {
    key: 'fontcolor',
    style: 'FONTCOLOR',
    type: 'color',
    label: <i className="iconfont icon-fontcolormerge" />,
    title: '字体颜色'
  },
  FONTBACKGROUNTCOLOR: {
    key: 'fontbackgrountcolor',
    label: <i className="iconfont icon-fontbackground" />,
    style: 'FONTBACKGROUNTCOLOR',
    type: 'color',
    title: '字体背景色'
  }
};


function hasStyles ( styles ) {
  return Array.isArray( styles ) && !!styles.length;
}


class InlineStyleControls extends React.Component {


  constructor ( props ) {
    super( props );
    this.state = {
      styles: hasStyles( this.props.styles ) ? this.props.styles : Object.keys( INLINE_STYLES )
    };
  }


  onToggle = ( inlineStyle, style ) => {

    const
      { editorState } = this.props,
      selection = editorState.getSelection();

    // 自定义行内样式
    if ( style ) {
      if ( fontFamilyStyles[ style ] ) {
        this.applyStyle( editorState, fontFamilyStyles, style );
      }
      else if ( fontSizeStyles[ style ] ) {
        this.applyStyle( editorState, fontSizeStyles, style );
      }
      else if ( colorStyles[ style ] ) {
        this.applyStyle( editorState, colorStyles, style );
      }
      else if ( backgroundColorStyles[ style ] ) {
        this.applyStyle( editorState, backgroundColorStyles, style );
      }
    }

    // 系统内置行内样式
    else if ( selection.getHasFocus() ) {
      this.props.onToggle( RichUtils.toggleInlineStyle(
        editorState,
        inlineStyle
      ) );
    }
  };


  // 应用行内样式
  applyStyle ( editorState, styles, toggledStyler ) {

    const
      selection = editorState.getSelection(),
      nextContentState = this.removeStyle( editorState, styles );

    let nextEditorState = EditorState.push(
      editorState,
      nextContentState,
      'change-inline-style'
    );

    const currentStyle = editorState.getCurrentInlineStyle();

    // Unset style override for current style.
    if ( selection.isCollapsed() ) {
      nextEditorState = currentStyle.reduce( ( state, style ) => {
        return styles[ style ]
          ? RichUtils.toggleInlineStyle( state, style )
          : state;
      }, nextEditorState );
    }

    // If the style is being toggled on, apply it.
    if ( !currentStyle.has( toggledStyler ) ) {
      nextEditorState = RichUtils.toggleInlineStyle(
        nextEditorState,
        toggledStyler
      );
    }

    this.props.onToggle( nextEditorState );

  }


  removeStyle ( editorState, styles ) {

    const
      selection = editorState.getSelection();

    return Object.keys( styles ).reduce(
      ( contentState, style ) => {
        return Modifier.removeInlineStyle( contentState, selection, style )
      },
      editorState.getCurrentContent()
    );

  }


  isActive ( style ) {
    const
      selection = this.props.editorState.getSelection(),
      currentStyle = this.props.editorState.getCurrentInlineStyle();
    return currentStyle.has( style ) && selection.getHasFocus();
  }


  render () {

    return (
      <div className="RichEditor-controls" style={this.props.style}>
        {this.state.styles.map(
          style => {
            const type = INLINE_STYLES[ style ];
            return (
              <StyleButton
                type={type.type}
                key={type.key}
                label={type.label}
                title={type.title}
                style={type.style}
                onToggle={this.onToggle}
                active={this.isActive( type.style )} />
            );
          }
        )}
      </div>
    );
  }

}


export default InlineStyleControls;

