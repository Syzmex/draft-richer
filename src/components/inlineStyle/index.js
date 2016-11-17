

import InlineStyleControls from './inlineStyleControls';
import { fontFamilyStyles, FontFamily } from './fontFamily';
import { fontSizeStyles, FontSize } from './fontSize';
import { colorStyles, backgroundColorStyles, Color } from './color';


const inlineStyles = {
  ...fontFamilyStyles,
  ...fontSizeStyles,
  ...colorStyles,
  ...backgroundColorStyles
};


export default {
  InlineStyleControls,
  inlineStyles,
  FontFamily,
  fontFamilyStyles,
  FontSize,
  fontSizeStyles,
  backgroundColorStyles,
  colorStyles,
  Color
};

