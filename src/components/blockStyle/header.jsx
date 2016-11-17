

import React from 'react';
import { Menu } from 'antd';
const MenuItem = Menu.Item;


const headers = {
  'header-one': props => <h1>{props.children}</h1>,
  'header-two': props => <h2>{props.children}</h2>,
  'header-three': props => <h3>{props.children}</h3>,
  'header-four': props => <h4>{props.children}</h4>,
  'header-five': props => <h5>{props.children}</h5>,
  'header-six': props => <h6>{props.children}</h6>
};


class Header extends React.Component {


  onClick = ( { key } ) => {
    this.props.onChange( { style: key } );
  };


  render () {
    return (
      <Menu selectedKeys={[]} onClick={this.onClick}>
        {Object.keys( headers ).map(
          key => {
            const Tag = headers[ key ];
            return (
              <MenuItem key={key}>
                 <Tag>Header</Tag>
              </MenuItem>
            );
          }
        )}
      </Menu>
    );
  }

}


export default Header;

