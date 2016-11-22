

import React from 'react';
import { Menu } from 'antd';


const

  MenuItem = Menu.Item,

  fontSizeStyles = [ 8, 9, 10, 11, 12, 13, 14, 16, 18, 20, 22, 24, 26, 28, 36, 48, 72 ].reduce(
    ( styles, size ) => {
      styles[ size ] = { fontSize: `${size}px` };
      return styles;
    }, {}
  );


function FontSize ( props ) {

  function handleClick ( { key } ) {
    props.onChange( key );
  }

  return (
    <Menu selectedKeys={[ props.select ]} onClick={handleClick}>
      {Object.keys( fontSizeStyles ).map( name => {
        return (
          <MenuItem key={name} style={fontSizeStyles[ name ]}>
            {name}
          </MenuItem>
        );
      } )}
    </Menu>
  );
}


export default {
  fontSizeStyles,
  FontSize
};

