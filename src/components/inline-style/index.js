

import InlineStylesControls from './inline-styles-controls';
import { fontFamilyStyles, FontFamily } from './font-family';
import { fontSizeStyles, FontSize } from './font-size';
import { colorStyles, backgroundColorStyles, Color } from './color';
import { customStyles } from './inline-styles';


export default {
  Color,
  FontSize,
  FontFamily,
  customStyles: {
    ...backgroundColorStyles,
    ...fontFamilyStyles,
    ...fontSizeStyles,
    ...colorStyles,
    ...customStyles
  },
  InlineStylesControls
};

