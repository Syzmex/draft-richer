

import React from 'react';
import classNames from 'classnames';
import { prefixCls } from '../config';


function Button ( props ) {

  const

    // 样式组合
    className = classNames( `${prefixCls}-button`, {
      active: props.active,
      disabled: props.disabled
    } ),

    // 点击回调函数
    handleMouseDown = function ( e ) {
      e.preventDefault();
      if ( !props.disabled && props.onToggle ) {
        props.onToggle( props.id );
      }
    };

  return (
    <span
      title={props.title}
      className={className}
      onMouseDown={handleMouseDown}>
      {props.label}
    </span>
  );
}


Button.propTypes = {
  active: React.PropTypes.bool,
  title: React.PropTypes.string,
  disabled: React.PropTypes.bool,
  onToggle: React.PropTypes.func,
  id: React.PropTypes.string,
  label: React.PropTypes.oneOfType( [
    React.PropTypes.string,
    React.PropTypes.element
  ] ).isRequired
};


export default Button;

