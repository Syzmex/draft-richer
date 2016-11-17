

import React from 'react';
import StylePopover from './stylePopover';


class StyleButton extends React.Component {


  constructor ( props ) {
    super( props );
    this.state = {
      visible: false
    };
  }


  onMouseDown = e => {
    e.preventDefault();
    this.props.onToggle( this.props.style );
  };


  onPopoverMouseDown = e => {
    e.preventDefault();
    this.setState( {
      visible: !this.state.visible
    } );
  };


  // 只有当关闭时触发打开由 MouseDown 触发
  onVisibleChange = visible => {
    if ( !visible ) {
      this.setState( { visible } );
    }
  }


  render () {

    let className = 'RichEditor-styleButton';
    if ( this.props.active ) {
      className += ' RichEditor-activeButton';
    }
    if ( this.props.disabled ) {
      className += ' RichEditor-disabledButton';
    }

    return !this.props.type ? (
      <span
        className={className}
        title={this.props.title}
        onMouseDown={this.onMouseDown}>
        {this.props.label}
      </span>
      ) : (
      <StylePopover
        type={this.props.type}
        style={this.props.style}
        visible={this.state.visible}
        onToggle={this.props.onToggle}
        onVisibleChange={this.onVisibleChange}>
        <span
          className={className}
          title={this.props.title}
          onMouseDown={this.onPopoverMouseDown}>
          {this.props.label}
        </span>
      </StylePopover>
    );

  }
}


export default StyleButton;

