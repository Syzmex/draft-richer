

import _ from 'lodash';
import React from 'react';
import {
  Editor,
  EditorState,
  ContentState,
  RichUtils,
  convertFromRaw,
  convertToRaw
} from 'draft-js';
import {
  BlockTypesControls,
  blockClassName,
  blockRenderer,
  blockRenderMap
} from './components/block-types';
import {
  InlineStylesControls,
  customStyles
} from './components/inline-style';
import { LinkControls } from './components/link';
import decorator from './components/decorator';
import styles from './editor.less';


class RichEditor extends React.Component {


  static propTypes = {
    value: React.PropTypes.oneOfType( [
      React.PropTypes.string,
      React.PropTypes.number,
      React.PropTypes.func
    ] ),
    onChange: React.PropTypes.func,
    placeholder: React.PropTypes.string,
    toolbar: React.PropTypes.shape( {
      blockTypes: React.PropTypes.arrayOf( React.PropTypes.string ),
      inlineStyles: React.PropTypes.arrayOf( React.PropTypes.string ),
      entity: React.PropTypes.arrayOf( React.PropTypes.string )
    } )
  };


  static defaultProps = {
    value: ''
  };


  constructor ( props ) {
    super( props );
    this.state = {
      editorState: null
    };
  }


  componentWillMount () {
    this.setEditorState( this.props.value );
  }


  componentWillReceiveProps ( nextProps ) {
    this.setEditorState( nextProps.value );
  }


  handleChange = ( editorState ) => {
    this.setState( { editorState } );
    if ( this.props.onChange ) {
      this.props.onChange( convertToRaw( editorState.getCurrentContent() ), editorState );
    }
  };


  setEditorState ( value ) {

    let contentState;

    // 接收的是 RAW
    if ( _.isObject( value ) ) {
      contentState = convertFromRaw( value );
    }

    else {
      contentState = ContentState.createFromText( `${value}` );
    }


    this.setState( {
      editorState: contentState
        ? EditorState.createWithContent( contentState, decorator )
        : EditorState.createEmpty( decorator )
    } );

  }


  focus = () => {
    // this.refs.editor.focus();
  };


  handleKeyCommand = ( command ) => {
    const
      { editorState } = this.state,
      nextState = RichUtils.handleKeyCommand( editorState, command );
    if ( nextState ) {
      this.handleChange( nextState );
      return true;
    }
    return false;
  };


  render () {

    const
      { editorState } = this.state,
      { placeholder, toolbar } = this.props,
      { blockTypes, inlineStyles, entity } = toolbar;

    return (
      <div className={styles.root}>
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
        <div className={styles.editor} onClick={this.focus}>
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

