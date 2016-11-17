

import React from 'react';
import { RichUtils } from 'draft-js';
import StyleButton from '../styleButton';


// DefaultDraftBlockRenderMap
const BLOCK_TYPES = {

  // 系统默认
  // 'header-one': {
  //   key: 'h1',
  //   style: 'header-one',
  //   label: 'H1'
  // },
  // 'header-two': {
  //   key: 'h2',
  //   label: 'H2',
  //   style: 'header-two'
  // },
  // 'header-three': {
  //   key: 'h3',
  //   label: 'H3',
  //   style: 'header-three'
  // },
  // 'header-four': {
  //   key: 'h4',
  //   label: 'H4',
  //   style: 'header-four'
  // },
  // 'header-five': {
  //   key: 'h5',
  //   label: 'H5',
  //   style: 'header-five'
  // },
  // 'header-six': {
  //   key: 'h6',
  //   label: 'H6',
  //   style: 'header-six'
  // },
  blockquote: {
    key: 'blockquote',
    label: <i className="iconfont icon-yinhao" />,
    title: '引用',
    style: 'blockquote'
  },
  'unordered-list-item': {
    key: 'ul',
    label: <i className="iconfont icon-listalt" />,
    title: '无序列表',
    style: 'unordered-list-item'
  },
  'ordered-list-item': {
    key: 'ol',
    label: <i className="iconfont icon-listol" />,
    title: '有序列表',
    style: 'ordered-list-item'
  },
  'code-block': {
    key: 'code-block',
    label: <i className="iconfont icon-script" />,
    title: '代码块',
    style: 'code-block'
  },

  // 自定义
  header: {
    key: 'header',
    label: <i className="iconfont icon-header" />,
    title: '标题',
    type: 'select',
    style: 'header'
  },
  'text-align-left': {
    key: 'left',
    label: <i className="iconfont icon-leftjustified" />,
    title: '左对齐',
    style: 'text-align-left'
  },
  'text-align-center': {
    key: 'center',
    label: <i className="iconfont icon-centerjustified" />,
    title: '居中对齐',
    style: 'text-align-center'
  },
  'text-align-right': {
    key: 'right',
    label: <i className="iconfont icon-rightjustified" />,
    title: '右对齐',
    style: 'text-align-right'
  },
  'text-align-justify': {
    key: 'justify',
    label: <i className="iconfont icon-defaultjustified" />,
    title: '两端对齐',
    style: 'text-align-justify'
  }
};


function hasStyles ( styles ) {
  return Array.isArray( styles ) && !!styles.length;
}


class BlockStyleControls extends React.Component {


  constructor ( props ) {
    super( props );
    this.state = {
      styles: hasStyles( this.props.styles ) ? this.props.styles : Object.keys( BLOCK_TYPES )
    };
  }


  onToggle = ( blockType, style ) => {
    this.props.onToggle( RichUtils.toggleBlockType(
      this.props.editorState,

      // 左对齐是默认样式
      // blockType !== 'text-align-left' ? blockType : 'unstyled'
      style || ( blockType !== 'text-align-left' ? blockType : 'unstyled' )
    ) );
  };


  isAlignLeft ( blockType, style ) {
    return (
      style === 'text-align-left' &&
      ![ 'text-align-center', 'text-align-right', 'text-align-justify' ].includes( blockType )
    );
  }


  isAvtive ( blockType, style ) {
    return (
      this.props.editorState.getSelection().getHasFocus() &&
      ( this.isAlignLeft( blockType, style ) || style === blockType )
    );
  }


  render () {

    const
      { editorState, style } = this.props,
      selection = editorState.getSelection(),
      blockType = editorState
        .getCurrentContent()
        .getBlockForKey( selection.getStartKey() )
        .getType();

    return (
      <div className="RichEditor-controls" style={style}>
        {this.state.styles.map(
          style => {
            const type = BLOCK_TYPES[ style ];
            return (
              <StyleButton
                key={type.key}
                type={type.type}
                label={type.label}
                title={type.title}
                style={type.style}
                onToggle={this.onToggle}
                active={this.isAvtive( blockType, type.style )} />
            );
          }
        )}
      </div>
    );
  }

}


export default BlockStyleControls;

