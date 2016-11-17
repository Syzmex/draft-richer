

import React from 'react';
import { Menu, Popover } from 'antd';
import { FontFamily } from './inlineStyle/fontFamily';
import { FontSize } from './inlineStyle/fontSize';
import { Color } from './inlineStyle/color';
import Header from './blockStyle/header';


class StylePopover extends React.Component {


  constructor ( props ) {
    super( props );
    this.state = {
      value: ''
    };
  }


  onToggle = style => {

    // this.props.style 按钮功能名称
    // style 样式
    this.props.onToggle( this.props.style, style );
  };


  onChange = value => {
    this.setState( { value } );
    this.onToggle( value.style );
  };


  getViewer () {
    switch ( this.props.style ) {

      case 'FONTFAMILY':
        return <FontFamily onChange={this.onChange} />;

      case 'FONTSIZE':
        return <FontSize onChange={this.onChange} />;

      case 'header':
        return <Header onChange={this.onChange} />;

      case 'FONTCOLOR':
        return <Color type="color" onChange={this.onChange} />;

      case 'FONTBACKGROUNTCOLOR':
        return <Color type="backgroundColor" onChange={this.onChange} />;

      default:
        return null;
    }
  }


  render () {

    return (
      <Popover
        placement="top"
        content={this.getViewer()}
        visible={this.props.visible}
        onVisibleChange={this.props.onVisibleChange}
        overlayClassName={`popover-${this.props.type} popover-${this.props.style.toLowerCase()}`}>
        {this.props.children}
      </Popover>
    );
  }
}


export default StylePopover;

