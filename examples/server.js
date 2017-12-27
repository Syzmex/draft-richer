

import React from 'react';
import { render } from 'react-dom';
import { RichEditor, Article } from '../src/index';
import { getRaw, isES } from '../src/utils';


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
    value: 'type something ...'
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

    const articleContent = isES( this.state.value )
      ? getRaw( this.state.value )
      : this.state.value;
// console.log(JSON.stringify(articleContent))
    return (
      <div>
        <h2>Editor Example</h2>
        <RichEditor
          placeholder="type something ..."
          onChange={this.handleChange}
          defaultValue={this.state.value}
          uploadConfig={{
            url( data ) {
              return `/emms/do/admin/public/updatetempfile.do?_=${+ new Date()};sessionid=2C92A5EDF306470E9131258D34195F54`;
            },
            fileurl( data ) {
              return `/emms/do/admin/public/gettempfile.do?filename=${data.hashname};sessionid=2C92A5EDF306470E9131258D34195F54`;
            },
            beforeResponse( response, handleSuccess, handleError ) {
              try {
                if ( response.state.return === 'true' ) {
                  handleSuccess({
                    name: response.data.fileName,
                    hashname: response.data.tempFileName
                  });
                } else {
                  handleError( response.state.info );
                }
              } catch ( e ) {
                handleError( e.toString());
              }
            }
          }}
          style={{ width: 500 }} />
        <br />
        <br />
        <br />
        <h2>Article Example</h2>
        <Article
          content={articleContent}
          fileurl={( data ) => {
            return `/emms/do/admin/public/gettempfile.do?_=asasd&filename=${data.hashname};sessionid=2C92A5EDF306470E9131258D34195F54`;
          }} />
      </div>
    );
  }
}

render( <Test />, document.getElementById( 'root' ));
