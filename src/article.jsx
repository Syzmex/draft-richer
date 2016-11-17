

import React from 'react';
import { Map } from 'Immutable';
import { getBlockClassName, blockRenderer } from './components/blockStyle';
import decorator from './components/decorator';
import customStyles from './customStyles';
import {
  Editor,
  EditorState,
  convertFromRaw,
  ContentState,
  DefaultDraftBlockRenderMap
} from 'draft-js';



const blockRenderMap = DefaultDraftBlockRenderMap.merge( Map( {
  'text-align-left': {},
  'text-align-center': {},
  'text-align-right': {}
} ) );

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

