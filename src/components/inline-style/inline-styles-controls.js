

import React from 'react';
import PropTypes from 'prop-types';
import { EditorState, RichUtils, Modifier } from 'draft-js';
import { colorStyles, backgroundColorStyles } from './color';
import { fontFamilyStyles } from './font-family';
import { fontSizeStyles } from './font-size';
import { inlineStyles } from './inline-styles';
import { prefixCls } from '../../config';


function InlineStylesControls( props ) {

  const { editorState } = props;

  const removeStyle = function( styles ) {

    const selection = editorState.getSelection();

    return Object.keys( styles ).reduce(( contentState, style ) => {
      return Modifier.removeInlineStyle( contentState, selection, style );
    }, editorState.getCurrentContent());

  };

  const applyStyle = function( styles, toggledStyler ) {

    const selection = editorState.getSelection();
    const nextContentState = removeStyle( styles );

    let nextEditorState = EditorState.push(
        editorState,
        nextContentState,
        'change-inline-style'
      );

    const currentStyle = editorState.getCurrentInlineStyle();

      // Unset style override for current style.
    if ( selection.isCollapsed()) {
      nextEditorState = currentStyle.reduce(( state, style ) => {
        return styles[style]
            ? RichUtils.toggleInlineStyle( state, style )
            : state;
      }, nextEditorState );
    }

      // If the style is being toggled on, apply it.
    if ( !currentStyle.has( toggledStyler )) {
      nextEditorState = RichUtils.toggleInlineStyle(
          nextEditorState,
          toggledStyler
        );
    }

    props.onToggle( nextEditorState );

  };

  const handleToggle = ( style ) => {

    const selection = editorState.getSelection();

      // 自定义行内样式
    if ( fontFamilyStyles[style]) {
      applyStyle( fontFamilyStyles, style );
    } else if ( fontSizeStyles[style]) {
      applyStyle( fontSizeStyles, style );
    } else if ( colorStyles[style]) {
      applyStyle( colorStyles, style );
    } else if ( backgroundColorStyles[style]) {
      applyStyle( backgroundColorStyles, style );
    } else if ( selection.getHasFocus()) {
      // 系统内置行内样式
      props.onToggle( RichUtils.toggleInlineStyle(
          editorState,
          style
        ));
    }
  };

    // 激活状态判断
  const isActive = function( style ) {
    const selection = editorState.getSelection();
    const currentStyle = editorState.getCurrentInlineStyle();
    return currentStyle.has( style ) && selection.getHasFocus();
  };

  const styles = props.styles || Object.keys( inlineStyles );

  return (
    <div className={`${prefixCls}-toolbar`}>
      {styles.map(( key ) => {
        const style = inlineStyles[key];
        const Element = style.Element;
        return (
          <Element
            id={key}
            key={key}
            label={style.label}
            title={style.title}
            onToggle={handleToggle}
            active={isActive( key )} />
        );
      })}
    </div>
  );
}


InlineStylesControls.propTypes = {
  styles: PropTypes.arrayOf( PropTypes.string ),
  onToggle: PropTypes.func.isRequired,
  editorState: PropTypes.instanceOf( EditorState ).isRequired
};


export default InlineStylesControls;

