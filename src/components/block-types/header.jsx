

import React from 'react';
import { Menu } from 'antd';


const

  MenuItem = Menu.Item,

  headers = {
    'header-one': props => <h1>{props.children}</h1>,
    'header-two': props => <h2>{props.children}</h2>,
    'header-three': props => <h3>{props.children}</h3>,
    'header-four': props => <h4>{props.children}</h4>,
    'header-five': props => <h5>{props.children}</h5>,
    'header-six': props => <h6>{props.children}</h6>
  };


function Header ( props ) {

  function handleClick ( { key } ) {
    props.onChange( key );
  }

  return (
    <Menu selectedKeys={[ props.select ]} onClick={handleClick}>
      {Object.keys( headers ).map( ( name ) => {
        const Head = headers[ name ];
        return (
          <MenuItem key={name}>
            <Head>Header</Head>
          </MenuItem>
        );
      } )}
    </Menu>
  );
}


Header.propTypes = {
  select: React.PropTypes.string,
  onChange: React.PropTypes.func
};


export default Header;

