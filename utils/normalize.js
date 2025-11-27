// import { Dimensions, PixelRatio } from 'react-native';

// const { width: SCREEN_WIDTH } = Dimensions.get('window');
// const BASE_WIDTH = 390; // reference width from your design (in dp)

// export const normalize = (size) => {
//   const scale = SCREEN_WIDTH / BASE_WIDTH;
//   const newSize = size * scale;
//   return Math.round(PixelRatio.roundToNearestPixel(newSize));
// };

// utils/normalize.js
import { Dimensions, PixelRatio } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// Base scale for a standard screen (like iPhone 11, 375x812)
const BASE_WIDTH = 375;
const BASE_HEIGHT = 812;

export const normalize = (size, based = 'width') => {
  const scale = based === 'height' ? SCREEN_HEIGHT / BASE_HEIGHT : SCREEN_WIDTH / BASE_WIDTH;
  const newSize = size * scale;

  // Moderated adjustment for high-density devices
  const normalized = newSize / PixelRatio.getFontScale();

  return Math.round(PixelRatio.roundToNearestPixel(normalized));
};

// For semantic clarity in your code:
export const normalizeFont = (size) => normalize(size, 'width');
export const normalizeIcon = (size) => normalize(size, 'width');
export const normalizeSpacing = (size) => normalize(size, 'width');