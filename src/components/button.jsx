

import React from 'react';
import classNames from 'classnames';
import styles from './button.less';


function Button ( props ) {

  const

    // 样式组合
    className = classNames( styles.button, {
      [ styles.active ]: props.active,
      [ styles.disabled ]: props.disabled
    } ),

    // 点击回调函数
    handleMouseDown = function ( e ) {
      e.preventDefault();
      if ( props.onToggle ) {
        props.onToggle( props.type );
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
  disabled: React.PropTypes.bool,
  onToggle: React.PropTypes.func,
  title: React.PropTypes.string,
  type: React.PropTypes.string.isRequired,
  label: React.PropTypes.oneOfType( [
    React.PropTypes.string,
    React.PropTypes.element
  ] ).isRequired
};


export default Button;

