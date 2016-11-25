

import React from 'react';
import styles from './color.less';


const colors = {
  Grey: {
    label: '灰色',
    list: [
      'rgba(255, 255, 255, 1.0)',
      'rgba(252, 252, 252, 1.0)',
      'rgba(236, 236, 236, 1.0)',
      'rgba(152, 152, 152, 1.0)',
      'rgba(204, 204, 204, 1.0)',
      'rgba(217, 217, 217, 1.0)',
      'rgba(102, 102, 102, 1.0)',
      'rgba(50, 50, 50, 1.0)',
      'rgba(0, 0, 0, 1.0)'
    ]
  },
  Red: {
    label: '红色',
    list: [
      'rgba(249, 204, 214, 1.0)',
      'rgba(255, 165, 180, 1.0)',
      'rgba(250, 114, 125, 1.0)',
      'rgba(187, 6, 6, 1.0)',
      'rgba(224, 21, 21, 1.0)',
      'rgba(255, 56, 88, 1.0)',
      'rgba(136, 20, 20, 1.0)',
      'rgba(78, 18, 18, 1.0)',
      'rgba(38, 4, 4, 1.0)'
    ]
  },
  Green: {
    label: '绿色',
    list: [
      'rgba(226, 245, 130, 1.0)',
      'rgba(208, 238, 156, 1.0)',
      'rgba(166, 227, 60, 1.0)',
      'rgba(57, 163, 14, 1.0)',
      'rgba(96, 190, 41, 1.0)',
      'rgba(112, 212, 69, 1.0)',
      'rgba(24, 121, 27, 1.0)',
      'rgba(31, 74, 18, 1.0)',
      'rgba(16, 40, 3, 1.0)'
    ]
  },
  Blue: {
    label: '蓝色',
    list: [
      'rgba(204, 228, 246, 1.0)',
      'rgba(149, 204, 245, 1.0)',
      'rgba(106, 194, 245, 1.0)',
      'rgba(29, 128, 211, 1.0)',
      'rgba(0, 160, 232, 1.0)',
      'rgba(45, 183, 245, 1.0)',
      'rgba(31, 90, 163, 1.0)',
      'rgba(11, 54, 106, 1.0)',
      'rgba(8, 23, 47, 1.0)'
    ]
  },
  Magenta: {
    label: '枚红色',
    list: [
      'rgba(248, 197, 237, 1.0)',
      'rgba(245, 166, 211, 1.0)',
      'rgba(243, 135, 192, 1.0)',
      'rgba(188, 15, 105, 1.0)',
      'rgba(233, 37, 158, 1.0)',
      'rgba(240, 86, 173, 1.0)',
      'rgba(137, 11, 76, 1.0)',
      'rgba(94, 11, 54, 1.0)',
      'rgba(35, 2, 19, 1.0)'
    ]
  },
  Orange: {
    label: '橙色',
    list: [
      'rgba(241, 221, 189, 1.0)',
      'rgba(251, 202, 114, 1.0)',
      'rgba(253, 172, 35, 1.0)',
      'rgba(206, 99, 15, 1.0)',
      'rgba(255, 97, 0, 1.0)',
      'rgba(255, 138, 12, 1.0)',
      'rgba(139, 74, 4, 1.0)',
      'rgba(82, 58, 19, 1.0)',
      'rgba(52, 31, 11, 1.0)'
    ]
  },
  Purple: {
    label: '紫色',
    list: [
      'rgba(232, 223, 250, 1.0)',
      'rgba(177, 150, 238, 1.0)',
      'rgba(136, 103, 210, 1.0)',
      'rgba(88, 28, 182, 1.0)',
      'rgba(94, 48, 181, 1.0)',
      'rgba(122, 67, 226, 1.0)',
      'rgba(63, 24, 125, 1.0)',
      'rgba(43, 24, 69, 1.0)',
      'rgba(15, 6, 27, 1.0)'
    ]
  },
  Yellow: {
    label: '黄色',
    list: [
      'rgba(250, 244, 178, 1.0)',
      'rgba(253, 241, 97, 1.0)',
      'rgba(253, 224, 35, 1.0)',
      'rgba(217, 180, 22, 1.0)',
      'rgba(250, 196, 80, 1.0)',
      'rgba(247, 205, 7, 1.0)',
      'rgba(180, 133, 19, 1.0)',
      'rgba(107, 76, 1, 1.0)',
      'rgba(36, 26, 6, 1.0)'
    ]
  },
  Cyan: {
    label: '青色',
    list: [
      'rgba(224, 247, 250, 1.0)',
      'rgba(178, 235, 242, 1.0)',
      'rgba(128, 222, 234, 1.0)',
      'rgba(0, 172, 194, 1.0)',
      'rgba(1, 186, 210, 1.0)',
      'rgba(38, 198, 218, 1.0)',
      'rgba(0, 112, 143, 1.0)',
      'rgba(1, 75, 98, 1.0)',
      'rgba(3, 18, 19, 1.0)'
    ]
  }
},

colorStyles = Object.keys( colors ).reduce( ( styles, colorName ) => {
  colors[ colorName ].list.forEach( ( rgb, index ) => {
    styles[ `color#${colorName}#${index + 1}` ] = { color: rgb };
  } );
  return styles;
}, {} ),


backgroundColorStyles = Object.keys( colors ).reduce( ( styles, colorName ) => {
  colors[ colorName ].list.forEach( ( rgb, index ) => {
    styles[ `backgroundColor#${colorName}#${index + 1}` ] = { backgroundColor: rgb };
  } );
  return styles;
}, {} );


function Color ( props ) {

  function handleClick ( key ) {
    props.onChange( key );
  }

  return (
    <div>
      {Object.keys( colors ).map( ( colorName ) => {
        return (
          <div key={colorName}>
            {colors[ colorName ].list.map( ( rgb, index ) => {
              const
                sType = props.type === 'color' ? 'color' : 'backgroundColor',
                typeColors = props.type === 'color' ? colorStyles : backgroundColorStyles,
                key = `${sType}#${colorName}#${index + 1}`;
              return (
                <span
                  key={key}
                  className={styles.colorButton}
                  title={`${colors[ colorName ].label}#${index + 1}`}
                  style={{ backgroundColor: typeColors[ key ][ sType ] }}
                  onMouseDown={( e ) => {
                    e.preventDefault();
                    handleClick( key );
                  }} />
              );
            } )}
          </div>
        );
      } )}
    </div>
  );
}


Color.propTypes = {
  type: React.PropTypes.string,
  select: React.PropTypes.string,
  onChange: React.PropTypes.func
};


export default {
  colorStyles,
  backgroundColorStyles,
  Color
};

