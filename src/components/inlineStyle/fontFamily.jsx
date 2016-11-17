

import React from 'react';
import { Menu } from 'antd';
const MenuItem = Menu.Item;



const fontFamily = {
  宋体: { fontFamily: 'SimSun' },
  黑体: { fontFamily: 'SimHei' },
  仿宋: { fontFamily: 'FangSong_GB2312' },
  楷体: { fontFamily: 'KaiTi_GB2312' },
  隶书: { fontFamily: 'LiSu' },
  幼圆: { fontFamily: 'YouYuan' },
  微软雅黑: { fontFamily: 'Microsoft YaHei' },
  Arial: { fontFamily: 'arial,helvetica,sans-serif' },
  'Comic Sans MS': { fontFamily: 'comic sans ms,cursive' },
  'Courier New': { fontFamily: 'courier new,courier,monospace' },
  'Lucida Sans Unicode': { fontFamily: 'lucida sans unicode,lucida grande,sans-serif' },
  Tahoma: { fontFamily: 'tahoma,geneva,sans-serif' },
  'Times New Roman': { fontFamily: 'times new roman,times,serif' },
  'Trebuchet MS': { fontFamily: 'trebuchet ms,helvetica,sans-serif' },
  Verdana: { fontFamily: 'verdana,geneva,sans-serif' }
};


class FontFamily extends React.Component {


  onClick = ( { key } ) => {
    this.props.onChange( { style: key } );
  };


  render () {

    return (
      <Menu selectedKeys={[]} onClick={this.onClick}>
        {Object.keys( fontFamily ).map(
          key => (
            <MenuItem key={key} style={{ fontSize: '14px', ...fontFamily[ key ] }}>
              {key}
            </MenuItem>
          )
        )}
      </Menu>
    );
  }

}


export default {
  fontFamilyStyles: fontFamily,
  FontFamily
};

