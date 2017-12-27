

import React from 'react';
// import PropTypes from 'prop-types';
import { colors, colorStyles, backgroundColorStyles } from './color-styles';
import { prefixCls } from '../../config';


function Color( props ) {

  function handleClick( key ) {
    props.onChange( key );
  }

  return (
    <div>
      {Object.keys( colors ).map(( colorName ) => {
        return (
          <div key={colorName}>
            {colors[colorName].list.map(( rgb, index ) => {
              const
                sType = props.type === 'color' ? 'color' : 'backgroundColor',
                typeColors = props.type === 'color' ? colorStyles : backgroundColorStyles,
                key = `${sType}#${colorName}#${index + 1}`;
              return (
                <span
                  key={key}
                  className={`${prefixCls}-color-button`}
                  title={`${colors[colorName].label}#${index + 1}`}
                  style={{ backgroundColor: typeColors[key][sType] }}
                  onMouseDown={( e ) => {
                    e.preventDefault();
                    handleClick( key );
                  }} />
              );
            })}
          </div>
        );
      })}
    </div>
  );
}


// Color.propTypes = {
//   type: PropTypes.string,
//   select: PropTypes.string,
//   onChange: PropTypes.func
// };


export default {
  colorStyles,
  backgroundColorStyles,
  Color
};

