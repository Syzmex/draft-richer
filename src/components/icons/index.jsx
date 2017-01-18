

import React from 'react';
import { prefixCls } from '../../config';


function Icon ( props ) {
  return <i className={`${prefixCls}-iconfont icon-${props.type}`} />
}


Icon.propTypes = {
  value: React.PropTypes.oneOfType( [
    React.PropTypes.string,
    React.PropTypes.number,
    React.PropTypes.func
  ] ),
  onChange: React.PropTypes.func
};


export default Icon;