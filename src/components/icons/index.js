

import React from 'react';
// import PropTypes from 'prop-types';
import { prefixCls } from '../../config';


function Icon( props ) {
  return <i className={`${prefixCls}-iconfont icon-${props.type}`} />;
}


// Icon.propTypes = {
//   value: PropTypes.oneOfType([
//     PropTypes.string,
//     PropTypes.number,
//     PropTypes.func
//   ]),
//   onChange: PropTypes.func
// };


export default Icon;
