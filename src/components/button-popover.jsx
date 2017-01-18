

import React from 'react';
import { Popover } from 'antd';
import Button from './button';
import { prefixCls } from '../config';


class ButtonPopover extends React.Component {


  static propTypes = {
    active: React.PropTypes.bool,
    disabled: React.PropTypes.bool,
    title: React.PropTypes.string,
    children: React.PropTypes.element,
    label: React.PropTypes.oneOfType( [
      React.PropTypes.string,
      React.PropTypes.element
    ] ).isRequired,

    // block type
    id: React.PropTypes.string.isRequired
  };


  constructor ( props ) {
    super( props );
    this.state = {
      visible: false
    };
  }


  handleToggle = () => {
    this.setState( {
      visible: !this.state.visible
    } );
  };


  handleVisibleChange = ( visible ) => {

    // 关闭气泡
    if ( this.state.visible && !visible ) {
      this.setState( {
        visible: false
      } );
    }
  };


  render () {

    return (
      <Popover
        placement="top"
        overlayClassName={`${prefixCls}-popover`}
        visible={this.state.visible}
        content={this.props.children}
        onVisibleChange={this.handleVisibleChange}>
        <Button
          title={this.props.title}
          label={this.props.label}
          active={this.props.active}
          onToggle={this.handleToggle}
          disabled={this.props.disabled} />
      </Popover>
    );
  }
}


export default ButtonPopover;

