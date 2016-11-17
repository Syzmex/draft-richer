

import React from 'react';
import { Menu } from 'antd';
const MenuItem = Menu.Item;

const
  fontSizeList = [ 8, 9, 10, 11, 12, 13, 14, 16, 18, 20, 22, 24, 26, 28, 36, 48, 72 ],
  fontSize = {};

fontSizeList.forEach( size => {
  fontSize[ size ] = { fontSize: `${size}px` }
} );


class FontSize extends React.Component {


  constructor ( props ) {
    super( props );
    this.state = { fontSize };
  }


  onClick = ( { key } ) => {
    this.props.onChange( { style: key } );
  };


  render () {
    return (
      <Menu selectedKeys={[]} onClick={this.onClick}>
        {fontSizeList.map(
          key => (
            <MenuItem key={key} style={fontSize[ key ]}>
              {key}
            </MenuItem>
          )
        )}
      </Menu>
    );
  }

}


export default {
  fontSizeStyles: fontSize,
  FontSize
};

