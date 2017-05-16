

import _ from 'lodash';
import React from 'react';
import {
  Editor,
  EditorState,
  convertFromRaw,
  ContentState
} from 'draft-js';
import {
  customStyles
} from './components/inline-style';
import {
  blockClassName,
  blockRenderer,
  blockRenderMap
} from './components/block-types';
import decorator from './components/decorator';


class Article extends React.Component {


  static propsTypes = {
    content: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.number,
      React.PropTypes.object
    ])
  };


  constructor( props ) {
    super( props );
    this.state = {
      editorState: this.setEditorState( props.content )
    };
  }


  setEditorState( value ) {

    let contentState;

    // 接收的是 RAW
    if ( _.isObject( value )) {
      contentState = convertFromRaw( value );
    } else {
      contentState = ContentState.createFromText( `${value}` );
    }


    return contentState
        ? EditorState.createWithContent( contentState, decorator )
        : EditorState.createEmpty( decorator );

  }


  render() {

    if ( this.props.content !== undefined ) {

      const { editorState } = this.state;

      return (
        <div className="RichEditor-editor Draft-article">
          <Editor
            readOnly
            editorState={editorState}
            customStyleMap={customStyles}
            blockRenderMap={blockRenderMap}
            blockRendererFn={blockRenderer}
            blockStyleFn={blockClassName} />
        </div>
      );
    }

    return null;

  }
}


export default Article;

