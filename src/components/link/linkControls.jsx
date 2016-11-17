

import React from 'react';
import { RichUtils, Entity } from 'draft-js';
import StyleButton from '../styleButton';
import { Modal, Form } from 'antd';
import LinkModal from './linkModal';


class LinkControls extends React.Component {


  constructor ( props ) {
    super( props );
    this.state = {
      visible: false
    };
  }


  onToggle = ( type, values ) => {

    const
      { editorState } = this.props,
      selection = editorState.getSelection();

    if ( type === 'add' ) {
      const entityKey = Entity.create( 'LINK', 'MUTABLE', {
        url: values.http + values.url, target: values.target
      } );
      this.props.onToggle( RichUtils.toggleLink( editorState, selection, entityKey ) );
      this.toggleLinkOption( false );
    }
    else {
      this.props.onToggle( RichUtils.toggleLink( editorState, selection, null ) );
    }

  };


  onOk = values => {
    this.onToggle( 'add', values );
  };


  addLink = () => {

    // 选中文字时可以弹出
    if ( this.isNotCollapsed() ) {
      this.toggleLinkOption( true )
    }
  };


  removeLink = () => {
    // 没有选中文字不做任何动作
    if ( this.isNotCollapsed() ) {
      this.onToggle( 'remove' );
    }
  };


  toggleLinkOption = open => {
    this.setState( {
      visible: open
    } );
  };


  hasLink () {

    let hasLink = false;

    const
      { editorState } = this.props,
      selection = editorState.getSelection(),
      startOffset = selection.getStartOffset(),
      endOffset = selection.getEndOffset(),
      block = editorState
        .getCurrentContent()
        .getBlockForKey( selection.getStartKey() );

      // 寻找实体 LINK， 非异步回调
      block.findEntityRanges( character => {
        const entityKey = character.getEntity();
        return entityKey !== null && Entity.get( entityKey ).getType() === 'LINK';
      }, ( start, end ) => {
        if (
          ( startOffset <= start && start <= endOffset ) ||
          ( startOffset <= end && end <= endOffset )
        ) {
          hasLink = true;
        }
      } );

      return hasLink;
  }


  isNotCollapsed = () => {
    const selection = this.props.editorState.getSelection()
    return !selection.isCollapsed() && selection.getHasFocus();
  }


  render () {

    return (
      <div className="RichEditor-controls" style={this.props.style}>
        <StyleButton
          style="add"
          title="添加链接"
          onToggle={this.addLink}
          disabled={!this.isNotCollapsed()}
          label={<i className="iconfont icon-link" />} />
        <StyleButton
          style="remove"
          title="删除链接"
          label={<i className="iconfont icon-unlink" />}
          onToggle={this.removeLink}
          disabled={!( this.isNotCollapsed() && this.hasLink() )} />
        <LinkModal
          onOk={this.onOk}
          visible={this.state.visible}
          onCancel={() => this.toggleLinkOption( false )} />
      </div>
    );
  }

}


export default LinkControls;

