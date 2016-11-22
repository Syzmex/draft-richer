

import InlineStylesControls from './inline-styles-controls';
import { fontFamilyStyles, FontFamily } from './font-family';
import { fontSizeStyles, FontSize } from './font-size';
import { colorStyles, backgroundColorStyles, Color } from './color';


export default {
  Color,
  FontSize,
  FontFamily,
  customStyles: {
    ...fontFamilyStyles,
    ...fontSizeStyles,
    ...colorStyles,
    ...backgroundColorStyles
  },
  InlineStylesControls
};

