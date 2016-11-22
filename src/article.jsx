

import React from 'react';
import { Map } from 'Immutable';
import { getBlockClassName, blockRenderer } from './components/block-types';
import decorator from './components/decorator';
import {
  Editor,
  EditorState,
  convertFromRaw,
  ContentState
} from 'draft-js';


class Article extends React.Component {


  static propsTypes = {
    content: React.PropTypes.object
  };


  render () {

    if ( this.props.content ) {
      const

        isString = Object.prototype.toString.call( this.props.content ) === '[object String]',

        editorState = EditorState.createWithContent(
          isString
            ? ContentState.createFromText( this.props.content )
            : convertFromRaw( this.props.content ),
          decorator
        );

      return (
        <div className="RichEditor-editor Draft-article">
          <Editor
            readOnly
            editorState={editorState}
            customStyleMap={customStyles}
            blockRenderMap={blockRenderMap}
            blockRendererFn={blockRenderer}
            blockStyleFn={getBlockClassName} />
        </div>
      );
    }

    return null;

  }
}


export default Article;

