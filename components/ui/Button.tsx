import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
} from 'react-native';
import Colors from '@/constants/Colors';
import Typography from '@/constants/Typography';

type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'outline';
type ButtonSize = 'small' | 'medium' | 'large';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  style,
  textStyle,
  fullWidth = false,
}) => {
  // Determine container style based on variant and size
  const getContainerStyle = (): ViewStyle => {
    let baseStyle: ViewStyle = {};
    
    // Variant styles
    switch (variant) {
      case 'primary':
        baseStyle = {
          backgroundColor: Colors.primary.pink,
          borderColor: Colors.primary.pink,
        };
        break;
      case 'secondary':
        baseStyle = {
          backgroundColor: Colors.secondary.lavender,
          borderColor: Colors.secondary.lavender,
        };
        break;
      case 'tertiary':
        baseStyle = {
          backgroundColor: Colors.tertiary.mint,
          borderColor: Colors.tertiary.mint,
        };
        break;
      case 'outline':
        baseStyle = {
          backgroundColor: 'transparent',
          borderColor: Colors.primary.pink,
          borderWidth: 1,
        };
        break;
    }
    
    // Size styles
    switch (size) {
      case 'small':
        baseStyle = {
          ...baseStyle,
          paddingVertical: 8,
          paddingHorizontal: 16,
          borderRadius: 12,
        };
        break;
      case 'medium':
        baseStyle = {
          ...baseStyle,
          paddingVertical: 12,
          paddingHorizontal: 24,
          borderRadius: 16,
        };
        break;
      case 'large':
        baseStyle = {
          ...baseStyle,
          paddingVertical: 16,
          paddingHorizontal: 32,
          borderRadius: 20,
        };
        break;
    }
    
    // Handle disabled state
    if (disabled) {
      baseStyle = {
        ...baseStyle,
        opacity: 0.6,
      };
    }
    
    // Handle fullWidth
    if (fullWidth) {
      baseStyle = {
        ...baseStyle,
        width: '100%',
        alignItems: 'center',
      };
    }
    
    return baseStyle;
  };
  
  // Determine text style based on variant and size
  const getTextStyle = (): TextStyle => {
    let baseStyle: TextStyle = { ...Typography.button };
    
    // Variant-specific text styles
    switch (variant) {
      case 'primary':
      case 'secondary':
      case 'tertiary':
        baseStyle = {
          ...baseStyle,
          color: Colors.neutral.gray8,
        };
        break;
      case 'outline':
        baseStyle = {
          ...baseStyle,
          color: Colors.primary.pink,
        };
        break;
    }
    
    // Size-specific text styles
    switch (size) {
      case 'small':
        baseStyle = {
          ...baseStyle,
          fontSize: 14,
        };
        break;
      case 'medium':
        baseStyle = {
          ...baseStyle,
          fontSize: 16,
        };
        break;
      case 'large':
        baseStyle = {
          ...baseStyle,
          fontSize: 18,
        };
        break;
    }
    
    return baseStyle;
  };
  
  return (
    <TouchableOpacity
      style={[styles.container, getContainerStyle(), style]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator 
          size="small" 
          color={variant === 'outline' ? Colors.primary.pink : Colors.neutral.gray8} 
        />
      ) : (
        <Text style={[getTextStyle(), textStyle]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.neutral.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
});

export default Button;