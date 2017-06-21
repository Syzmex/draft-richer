

import React from 'react';
import { render } from 'react-dom';
import { RichEditor } from '../src/index';
import './index.html';
import './index.less';


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


class TestWrap extends React.Component {

  state = {
    value: ''
  };

  componentDidMount() {
    // setTimeout(() => {
    //   this.setState({ value: '123123' });
    // }, 1000 );
  }

  handleChange = ( raw, editorState ) => {
    this.setState({ value: editorState });
    if ( raw ) {
      // console.log( editorState.getCurrentContent().getPlainText() )
    }
  };

  render() {
    return (
      <RichEditor
        toolbar={toolbar}
        onChange={this.handleChange}
        defaultValue={this.state.value} />
    );
  }
}

render( <TestWrap />, document.getElementById( 'example' ));
