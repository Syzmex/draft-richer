

import React from 'react';


export default contentBlock => {

  const type = contentBlock.getType();

  // if ( type === 'text-align-left' ) {
  //   return {
  //     type: 'text-align-left',
  //     component: Alignment,
  //     editable: true
  //   };
  // }
  // else if ( type === 'text-align-center' ) {
  //   return {
  //     component: Alignment,
  //     editable: true
  //   };
  // }
  // else if ( type === 'text-align-right' ) {
  //   return {
  //     type: 'text-align-right',
  //     component: Alignment,
  //     editable: false
  //   };
  // }

  return {};

};

