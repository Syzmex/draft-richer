

import './index.html';
import './index.css';
import React from 'react';
import { render } from 'react-dom';
import { AntdEditor } from '../src/index';



function onTextChange ( raw, editorState ) {
  if ( raw ) {
    console.log( editorState.getCurrentContent().getPlainText() )
  }
};


render( (
  <AntdEditor onChange={onTextChange} />
), document.getElementById( 'example' ) )