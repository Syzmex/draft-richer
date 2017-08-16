

import React from 'react';
import omit from 'omit.js';
import itis from 'whatitis';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import isPlainObject from 'is-plain-object';
import { Editor, EditorState, ContentState, RichUtils, convertFromRaw, convertToRaw } from 'draft-js';
import { BlockTypesControls, blockClassName, blockRenderer, blockRenderMap } from './components/block-types';
import { InlineStylesControls, customStyles } from './components/inline-style';
import { LinkControls } from './components/link';
import decorator from './components/decorator';
import { prefixCls } from './config';


const isEditorState = itis.isItClass( EditorState );

class RichEditor extends React.Component {

  static propTypes = {
    value: PropTypes.object, // eslint-disable-line
    defaultValue: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.object
    ]),
    onChange: PropTypes.func,
    placeholder: PropTypes.string,
    toolbar: PropTypes.shape({
      blockTypes: PropTypes.arrayOf( PropTypes.string ),
      inlineStyles: PropTypes.arrayOf( PropTypes.string ),
      entity: PropTypes.arrayOf( PropTypes.string )
    })
  };

  state = {
    editorState: null
  };

  componentWillMount() {
    if ( this.props.defaultValue ) {
      this.setEditorState( this.props.defaultValue );
    } else {
      this.setEditorState( '' );
    }
  }

  componentWillReceiveProps( nextProps ) {
    if (
      isEditorState( nextProps.defaultValue ) ||
      ( !this.props.defaultValue && nextProps.defaultValue )
    ) {
      this.setEditorState( nextProps.defaultValue );
    }
  }

  handleChange = ( editorState ) => {
    this.setState({ editorState });
    if ( this.props.onChange ) {
      this.props.onChange( convertToRaw( editorState.getCurrentContent()), editorState );
    }
  };

  handleKeyCommand = ( command ) => {
    const { editorState } = this.state;
    const nextState = RichUtils.handleKeyCommand( editorState, command );
    if ( nextState ) {
      this.handleChange( nextState );
      return true;
    }
    return false;
  };

  setEditorState( value = '' ) {

    let contentState;

    // 接收的是 EditorState
    if ( value instanceof EditorState ) {
      this.setState({ editorState: value });
      return;
    }

    // 接收的是 RAW
    if ( isPlainObject( value )) {
      contentState = convertFromRaw( value );
    } else if ( value ) {
      contentState = ContentState.createFromText( `${value}` );
    }

    const editorState = contentState
      ? EditorState.createWithContent( contentState, decorator )
      : EditorState.createEmpty( decorator );

    this.setState({ editorState });
  }

  focus = () => {
    // this.refs.editor.focus();
  };

  render() {

    const { editorState } = this.state;
    const { placeholder, toolbar, className } = this.props;
    const { blockTypes, inlineStyles, entity } = toolbar;
    const clsnames = classNames( `${prefixCls}-root`, className );
    const props = omit( this.props, [
      'value', 'defaultValue', 'onChange', 'placeholder', 'toolbar', 'className'
    ]);
    return (
      <div className={clsnames} {...props}>
        {blockTypes ? (
          <BlockTypesControls
            types={blockTypes}
            editorState={editorState}
            onToggle={this.handleChange} />
        ) : null}
        {inlineStyles ? (
          <InlineStylesControls
            styles={inlineStyles}
            editorState={editorState}
            onToggle={this.handleChange} />
        ) : null}
        {entity && entity.includes( 'link' ) ? (
          <LinkControls
            editorState={editorState}
            onToggle={this.handleChange} />
        ) : null}
        <div className={`${prefixCls}-editor`} onClick={this.focus}>
          <Editor
            editorState={editorState}
            placeholder={placeholder}
            onChange={this.handleChange}
            customStyleMap={customStyles}
            blockStyleFn={blockClassName}
            blockRenderMap={blockRenderMap}
            blockRendererFn={blockRenderer}
            handleKeyCommand={this.handleKeyCommand} />
        </div>
      </div>
    );
  }
}


export default RichEditor;
