

import './index.html';
import './index.css';
import React from 'react';
import { render } from 'react-dom';
import { RichEditor } from '../src/index';


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
  ],

  entity: [
    'link'
  ]

};


function onTextChange ( raw, editorState ) {
  if ( raw ) {
    // console.log( editorState.getCurrentContent().getPlainText() )
  }
}


render( (
  <RichEditor
    toolbar={toolbar}
    onChange={onTextChange} />
), document.getElementById( 'example' ) )