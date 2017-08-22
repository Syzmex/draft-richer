

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { prefixCls } from '../config';


function Button( props ) {

  // 样式组合
  const className = classNames( `${prefixCls}-button`, {
    active: props.active,
    disabled: props.disabled
  });

    // 点击回调函数
  const handleMouseDown = function( e ) {
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
  active: PropTypes.bool,
  title: PropTypes.string,
  disabled: PropTypes.bool,
  onToggle: PropTypes.func,
  id: PropTypes.string,
  label: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element
  ])
};


export default Button;

