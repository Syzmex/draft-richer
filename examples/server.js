

import './index.html';
import './index.css';
import React from 'react';
import { render } from 'react-dom';
import { RichEditor } from '../src/index';



function onTextChange ( raw, editorState ) {
  if ( raw ) {
    // console.log( editorState.getCurrentContent().getPlainText() )
  }
};


render( (
  <RichEditor onChange={onTextChange} />
), document.getElementById( 'example' ) )