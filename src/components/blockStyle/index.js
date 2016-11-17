

import BlockStyleControls from './blockStyleControls';
import blockRenderer from './blockRenderer';
import Header from './header';


function getBlockClassName ( block ) {

  switch ( block.getType() ) {

    case 'blockquote':
      return 'RichEditor-blockquote';

    // case 'text-align-left':
    //   return 'RichEditor-align-left';

    case 'text-align-center':
      return 'RichEditor-align-center';

    case 'text-align-right':
      return 'RichEditor-align-right';

    case 'text-align-justify':
      return 'RichEditor-align-justify';

    default:
      return '';
  }

}


const blockStyles = {};


export default {
  BlockStyleControls,
  getBlockClassName,
  blockRenderer,
  blockStyles,
  Header
};

