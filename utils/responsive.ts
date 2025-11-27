import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

/**
 * Responsive utility functions for consistent sizing across devices
 * 
 * This utility provides standardized scaling functions for:
 * - Text sizes (using moderateScale to prevent text from being too large)
 * - Icons and images (using scale for consistent proportions)
 * - Spacing and dimensions (using scale for horizontal, verticalScale for vertical)
 * - Border radius and other UI elements
 */

export const responsive = {
  // Text scaling - prevents text from becoming too large on tablets
  fontSize: (size: number) => moderateScale(size),
  
  // Icon and image scaling - maintains consistent proportions
  icon: (size: number) => scale(size),
  image: (size: number) => scale(size),
  
  // Horizontal spacing and dimensions
  width: (size: number) => scale(size),
  paddingHorizontal: (size: number) => scale(size),
  marginHorizontal: (size: number) => scale(size),
  
  // Vertical spacing and dimensions
  height: (size: number) => verticalScale(size),
  paddingVertical: (size: number) => verticalScale(size),
  marginVertical: (size: number) => verticalScale(size),
  
  // Border radius scaling
  radius: (size: number) => scale(size),
  
  // General spacing (use scale for most cases)
  spacing: (size: number) => scale(size),
  padding: (size: number) => scale(size),
  margin: (size: number) => scale(size),
  
  // Specific spacing functions for common use cases
  cardPadding: (size: number) => scale(size),
  buttonPadding: (size: number) => scale(size),
  inputPadding: (size: number) => scale(size),
  
  // Navigation and header specific
  headerHeight: () => verticalScale(60),
  tabBarHeight: () => verticalScale(60),
  
  // Screen dimensions
  screenWidth: () => scale(375), // Base width
  screenHeight: () => verticalScale(812), // Base height
};


export const sizes = {
  // Text sizes
  text: {
    xs: responsive.fontSize(10),
    sm: responsive.fontSize(12),
    base: responsive.fontSize(14),
    lg: responsive.fontSize(16),
    xl: responsive.fontSize(18),
    '2xl': responsive.fontSize(20),
    '3xl': responsive.fontSize(24),
    '4xl': responsive.fontSize(28),
  },
  
  // Icon sizes
  icon: {
    xs: responsive.icon(12),
    sm: responsive.icon(16),
    base: responsive.icon(20),
    lg: responsive.icon(24),
    xl: responsive.icon(28),
    '2xl': responsive.icon(32),
  },
  
  // Spacing sizes
  spacing: {
    xs: responsive.spacing(4),
    sm: responsive.spacing(8),
    base: responsive.spacing(12),
    lg: responsive.spacing(16),
    xl: responsive.spacing(20),
    '2xl': responsive.spacing(24),
    '3xl': responsive.spacing(32),
  },
  
  // Border radius sizes
  radius: {
    sm: responsive.radius(4),
    base: responsive.radius(8),
    lg: responsive.radius(12),
    xl: responsive.radius(16),
    '2xl': responsive.radius(20),
    full: responsive.radius(999),
  },
  
  // Button sizes
  button: {
    sm: {
      paddingHorizontal: responsive.spacing(12),
      paddingVertical: responsive.spacing(8),
      fontSize: responsive.fontSize(12),
    },
    base: {
      paddingHorizontal: responsive.spacing(16),
      paddingVertical: responsive.spacing(12),
      fontSize: responsive.fontSize(14),
    },
    lg: {
      paddingHorizontal: responsive.spacing(20),
      paddingVertical: responsive.spacing(16),
      fontSize: responsive.fontSize(16),
    },
  },
};

export default responsive;