
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Editor } from 'draft-js';
import { blockClassName, articleBlockRenderer, blockRenderMap } from './components/block-types/block-renderer';
import customStyles from './components/inline-style/custom-styles';
import fontFamilyStyles from './components/inline-style/font-family-styles';
import fontSizeStyles from './components/inline-style/font-size-styles';
import { colorStyles, backgroundColorStyles } from './components/inline-style/color-styles';
import { createArticleState } from './utils';
import { prefixCls } from './config';


function Article({ content, className, fileurl, ...props }) {

  const editorState = createArticleState( content, true );
  const clsnames = classNames( `${prefixCls}-article`, className );
  const blockPorps = { fileurl };

  return (
    <div className={clsnames} {...props}>
      <Editor
        readOnly
        tabIndex="-1"
        editorState={editorState}
        customStyleMap={
          Object.assign(
            backgroundColorStyles,
            fontFamilyStyles,
            fontSizeStyles,
            customStyles,
            colorStyles
          )
        }
        blockRenderMap={blockRenderMap}
        blockRendererFn={articleBlockRenderer( blockPorps )}
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
