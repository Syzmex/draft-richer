

import React from 'react';
import { EditorState, RichUtils, Modifier } from 'draft-js';
import { colorStyles, backgroundColorStyles } from './color';
import { fontFamilyStyles } from './font-family';
import { fontSizeStyles } from './font-size';
import { inlineStyles } from './inline-styles';
import { prefixCls } from '../../config';


function InlineStylesControls ( props ) {

  const

    { editorState } = props,

    handleToggle = ( style ) => {

      const selection = editorState.getSelection();

      // 自定义行内样式
      if ( fontFamilyStyles[ style ] ) {
        applyStyle( fontFamilyStyles, style );
      }
      else if ( fontSizeStyles[ style ] ) {
        applyStyle( fontSizeStyles, style );
      }
      else if ( colorStyles[ style ] ) {
        applyStyle( colorStyles, style );
      }
      else if ( backgroundColorStyles[ style ] ) {
        applyStyle( backgroundColorStyles, style );
      }

      // 系统内置行内样式
      else if ( selection.getHasFocus() ) {
        props.onToggle( RichUtils.toggleInlineStyle(
          editorState,
          style
        ) );
      }
    },


    applyStyle = function ( styles, toggledStyler ) {

      const
        selection = editorState.getSelection(),
        nextContentState = removeStyle( styles );

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

      props.onToggle( nextEditorState );

    },

    removeStyle = function ( styles ) {

      const selection = editorState.getSelection();

      return Object.keys( styles ).reduce( ( contentState, style ) => {
        return Modifier.removeInlineStyle( contentState, selection, style )
      }, editorState.getCurrentContent() );

    },

    // 激活状态判断
    isActive = function ( style ) {
      const
        selection = editorState.getSelection(),
        currentStyle = editorState.getCurrentInlineStyle();
      return currentStyle.has( style ) && selection.getHasFocus();
    },

    styles = props.styles || Object.keys( inlineStyles );

  return (
    <div className={`${prefixCls}-toolbar`}>
      {styles.map( ( key ) => {
        const
          style = inlineStyles[ key ],
          Element = style.Element;
        return (
          <Element
            id={key}
            key={key}
            label={style.label}
            title={style.title}
            onToggle={handleToggle}
            active={isActive( key )} />
        );
      } )}
    </div>
  );
}


InlineStylesControls.propTypes = {
  styles: React.PropTypes.arrayOf( React.PropTypes.string ),
  onToggle: React.PropTypes.func.isRequired,
  editorState: React.PropTypes.instanceOf( EditorState ).isRequired
};


export default InlineStylesControls;

