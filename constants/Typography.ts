import { TextStyle } from 'react-native';
import Colors from './Colors';

export const Typography = {
  heading1: {
    fontFamily: 'Playfair-Bold',
    fontSize: 32,
    lineHeight: 38,
    color: Colors.neutral.black,
  } as TextStyle,
  
  heading2: {
    fontFamily: 'Playfair-Bold',
    fontSize: 26,
    lineHeight: 32,
    color: Colors.neutral.black,
  } as TextStyle,
  
  heading3: {
    fontFamily: 'Playfair-Bold',
    fontSize: 22,
    lineHeight: 28,
    color: Colors.neutral.black,
  } as TextStyle,
  
  heading4: {
    fontFamily: 'Playfair-Regular',
    fontSize: 20,
    lineHeight: 24,
    color: Colors.neutral.black,
  } as TextStyle,
  
  subtitle1: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    lineHeight: 24,
    color: Colors.neutral.gray7,
  } as TextStyle,
  
  subtitle2: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    lineHeight: 22,
    color: Colors.neutral.gray7,
  } as TextStyle,
  
  body1: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    lineHeight: 24,
    color: Colors.neutral.gray7,
  } as TextStyle,
  
  body2: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    lineHeight: 21,
    color: Colors.neutral.gray7,
  } as TextStyle,
  
  caption: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    lineHeight: 18,
    color: Colors.neutral.gray6,
  } as TextStyle,
  
  button: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    lineHeight: 24,
    color: Colors.neutral.white,
  } as TextStyle,
};

export default Typography;