

import React from 'react';
import { Popover } from 'antd';
import PropTypes from 'prop-types';
import Button from './button';
import { prefixCls } from '../config';


class ButtonPopover extends React.Component {


  static propTypes = {
    active: PropTypes.bool,
    disabled: PropTypes.bool,
    title: PropTypes.string,
    children: PropTypes.element,
    label: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.element
    ]).isRequired,

    // block type
    id: PropTypes.string.isRequired
  };


  constructor( props ) {
    super( props );
    this.state = {
      visible: false
    };
  }


  handleToggle = () => {
    this.setState({
      visible: !this.state.visible
    });
  };


  handleVisibleChange = ( visible ) => {

    // 关闭气泡
    if ( this.state.visible && !visible ) {
      this.setState({
        visible: false
      });
    }
  };


  render() {

    return (
      <Popover
        placement="top"
        visible={this.state.visible}
        content={this.props.children}
        overlayClassName={`${prefixCls}-popover`}
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

