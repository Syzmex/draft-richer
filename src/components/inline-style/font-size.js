

import React from 'react';
import { Menu } from 'antd';
import fontSizeStyles from './font-size-styles';


const MenuItem = Menu.Item;


function FontSize( props ) {

  function handleClick({ key }) {
    props.onChange( key );
  }

  return (
    <Menu selectedKeys={[props.select]} onClick={handleClick}>
      {Object.keys( fontSizeStyles ).map( name => {
        return (
          <MenuItem key={name} style={fontSizeStyles[name]}>
            {name}
          </MenuItem>
        );
      })}
    </Menu>
  );
}


export default {
  fontSizeStyles,
  FontSize
};

