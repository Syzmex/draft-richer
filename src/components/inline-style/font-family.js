

import React from 'react';
import { Menu } from 'antd';
import PropTypes from 'prop-types';
import fontFamilyStyles from './font-family-styles';


const MenuItem = Menu.Item;


function FontFamily( props ) {

  function handleClick({ key }) {
    props.onChange( key );
  }

  return (
    <Menu selectedKeys={[props.select]} onClick={handleClick}>
      {Object.keys( fontFamilyStyles ).map(( name ) => {
        return (
          <MenuItem
            key={name}
            style={{ fontSize: '14px', ...fontFamilyStyles[name] }}>
            {name}
          </MenuItem>
        );
      })}
    </Menu>
  );
}


FontFamily.propTypes = {
  select: PropTypes.string
  // onChange: PropTypes.func
};


export default {
  fontFamilyStyles,
  FontFamily
};
