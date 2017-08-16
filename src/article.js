
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Editor } from 'draft-js';
import { blockClassName, blockRenderer, blockRenderMap } from './components/block-types';
import { customStyles } from './components/inline-style';
import { createEditorState } from './utils';
import { prefixCls } from './config';


function Article({ content, className, ...props }) {

  const editorState = createEditorState( content );
  const clsnames = classNames( `${prefixCls}-article`, className );

  return (
    <div className={clsnames} {...props}>
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


Article.propsTypes = {
  content: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.object
  ])
};

export default Article;
