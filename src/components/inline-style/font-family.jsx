

import React from 'react';
import { Menu } from 'antd';

const

  MenuItem = Menu.Item,

  fontFamilyStyles = {
    '宋体': { fontFamily: 'SimSun' },
    '黑体': { fontFamily: 'SimHei' },
    '仿宋': { fontFamily: 'FangSong_GB2312' },
    '楷体': { fontFamily: 'KaiTi_GB2312' },
    '隶书': { fontFamily: 'LiSu' },
    '幼圆': { fontFamily: 'YouYuan' },
    '微软雅黑': { fontFamily: 'Microsoft YaHei' },
    'Arial': { fontFamily: 'arial,helvetica,sans-serif' },
    'Comic Sans MS': { fontFamily: 'comic sans ms,cursive' },
    'Courier New': { fontFamily: 'courier new,courier,monospace' },
    'Lucida Sans Unicode': { fontFamily: 'lucida sans unicode,lucida grande,sans-serif' },
    'Tahoma': { fontFamily: 'tahoma,geneva,sans-serif' },
    'Times New Roman': { fontFamily: 'times new roman,times,serif' },
    'Trebuchet MS': { fontFamily: 'trebuchet ms,helvetica,sans-serif' },
    'Verdana': { fontFamily: 'verdana,geneva,sans-serif' }
  };


function FontFamily ( props ) {

  function handleClick ( { key } ) {
    props.onChange( key );
  }

  return (
    <Menu selectedKeys={[ props.select ]} onClick={handleClick}>
      {Object.keys( fontFamilyStyles ).map( name => {
        return (
          <MenuItem key={name} style={{ fontSize: '14px', ...fontFamilyStyles[ name ] }}>
             {name}
          </MenuItem>
        );
      } )}
    </Menu>
  );
}


FontFamily.propTypes = {
  select: React.PropTypes.string,
  onChange: React.PropTypes.func
};


export default {
  fontFamilyStyles,
  FontFamily
};
