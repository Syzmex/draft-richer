

import _ from 'lodash';
import React from 'react';
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
import {
  Editor,
  EditorState,
  ContentState,
  RichUtils,
  convertFromRaw,
  convertToRaw
} from 'draft-js';


// 工具栏配置
const toolbar = {

  blockTypes: [
    'header',
    'code-block',
    'blockquote',
    'unordered-list-item',
    'ordered-list-item'
  ],

  inlineStyles: [
    'BOLD',
    'ITALIC',
    'UNDERLINE',
    'STRIKETHROUGH',
    'FONTFAMILY',
    'FONTSIZE',
    'FONTCOLOR',
    'FONTBACKGROUNTCOLOR'
  ]

};


class RichEditor extends React.Component {


  static propTypes = {
    value: React.PropTypes.oneOfType( [
      React.PropTypes.string,
      React.PropTypes.number,
      React.PropTypes.func
    ] ),
    onChange: React.PropTypes.func
  };


  static defaultProps = {
    value:''
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


  onChange = ( editorState ) => {
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
    this.refs.editor.focus();
  };


  handleKeyCommand = ( command ) => {
    const
      { editorState } = this.state,
      nextState = RichUtils.handleKeyCommand( editorState, command );
    if ( nextState ) {
      this.onChange( nextState );
      return true;
    }
    return false;
  };


  render () {

    const { editorState } = this.state;

    // If the user changes block type before entering any text, we can
    // either style the placeholder or hide it. Let's just hide it now.
    let className = 'RichEditor-editor';
    const contentState = editorState.getCurrentContent();

    if (
      contentState.hasText() ||
      contentState.getBlockMap().first().getType() !== 'unstyled'
    ) {
      className += ' RichEditor-hidePlaceholder';
    }

    return (
      <div className="RichEditor-root">
        <BlockTypesControls
          onToggle={this.onChange}
          editorState={editorState}
          types={toolbar.blockTypes} />
        <InlineStylesControls
          onToggle={this.onChange}
          editorState={editorState}
          styles={toolbar.inlineStyles} />
        <LinkControls
          onToggle={this.onChange}
          editorState={editorState} />
        <div className={className} onClick={this.focus}>
          <Editor
            ref="editor"
            onChange={this.onChange}
            editorState={editorState}
            customStyleMap={customStyles}
            blockRenderMap={blockRenderMap}
            blockRendererFn={blockRenderer}
            blockStyleFn={blockClassName}
            placeholder={this.props.placeholder}
            handleKeyCommand={this.handleKeyCommand} />
        </div>
      </div>
    );
  }
}


export default RichEditor;

