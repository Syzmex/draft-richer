

import React from 'react';
import { render } from 'react-dom';
import { RichEditor, Article } from '../src/index';


// 工具栏配置
// const toolbar = {

//   blockTypes: [
//     'header',
//     'code-block',
//     'blockquote',
//     'unordered-list-item',
//     'ordered-list-item'
//   ],

//   inlineStyles: [
//     'BOLD',
//     'ITALIC',
//     'UNDERLINE',
//     'STRIKETHROUGH',
//     'FONTFAMILY',
//     'FONTSIZE',
//     'FONTCOLOR',
//     'FONTBACKGROUNTCOLOR'
//   ],

//   entity: [
//     'link'
//   ]

// };


class Test extends React.Component {

  state = {
    value: ''
  };

  componentDidMount() {
    // setTimeout(() => {
    //   this.setState({ value: '123123' });
    // }, 1000 );
  }

  handleChange = ( editorState ) => {
    this.setState({ value: editorState });
  };

  render() {
    return (
      <div>
        <h2>Editor Example</h2>
        <RichEditor
          // toolbar={{}}
          // placeholder="asdasd"
          onChange={this.handleChange}
          defaultValue={this.state.value}
          style={{ width: 800 }} />
        <br />
        <br />
        <br />
        <h2>Article Example</h2>
        <Article content="asdasdas" />
      </div>
    );
  }
}

render( <Test />, document.getElementById( 'root' ));
