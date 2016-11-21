

import React from 'react';
import styles from './icons.css';


function Icon ( props ) {
  return <i className={`${styles.iconfont} ${styles[ `icon-${props.type}` ]}`} />
};


Icon.propTypes = {
  value: React.PropTypes.oneOfType( [
    React.PropTypes.string,
    React.PropTypes.number,
    React.PropTypes.func
  ] ),
  onChange: React.PropTypes.func
};


export default Icon;