

import './index.html';
import './index.css';
import React from 'react';
import { render } from 'react-dom';




function onTextChange ( raw, editorState ) {
  if ( raw ) {
    console.log( editorState.getCurrentContent().getPlainText() )
  }
};


render( (
  <div>asdasdasdas</div>
), document.getElementById( 'example' ) )