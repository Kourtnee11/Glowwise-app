import React from 'react';
import { View, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import Colors from '@/constants/Colors';
import Typography from '@/constants/Typography';

type BadgeVariant = 'default' | 'primary' | 'secondary' | 'tertiary' | 'success' | 'warning' | 'error';
type BadgeSize = 'small' | 'medium' | 'large';

interface BadgeProps {
  label: string;
  variant?: BadgeVariant;
  size?: BadgeSize;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

const Badge: React.FC<BadgeProps> = ({
  label,
  variant = 'default',
  size = 'medium',
  style,
  textStyle,
}) => {
  // Get background color based on variant
  const getBackgroundColor = (): string => {
    switch (variant) {
      case 'default':
        return Colors.neutral.gray2;
      case 'primary':
        return Colors.primary.pinkLight;
      case 'secondary':
        return Colors.secondary.lavenderLight;
      case 'tertiary':
        return Colors.tertiary.mintLight;
      case 'success':
        return Colors.status.success + '20'; // 20% opacity
      case 'warning':
        return Colors.status.warning + '20'; // 20% opacity
      case 'error':
        return Colors.status.error + '20'; // 20% opacity
    }
  };

  // Get text color based on variant
  const getTextColor = (): string => {
    switch (variant) {
      case 'default':
        return Colors.neutral.gray7;
      case 'primary':
        return Colors.primary.pinkDark;
      case 'secondary':
        return Colors.secondary.lavenderDark;
      case 'tertiary':
        return Colors.tertiary.mintDark;
      case 'success':
        return Colors.status.success;
      case 'warning':
        return Colors.status.warning;
      case 'error':
        return Colors.status.error;
    }
  };

  // Get padding based on size
  const getPadding = (): { paddingVertical: number; paddingHorizontal: number } => {
    switch (size) {
      case 'small':
        return { paddingVertical: 2, paddingHorizontal: 6 };
      case 'medium':
        return { paddingVertical: 4, paddingHorizontal: 8 };
      case 'large':
        return { paddingVertical: 6, paddingHorizontal: 12 };
    }
  };

  // Get font size based on size
  const getFontSize = (): TextStyle => {
    switch (size) {
      case 'small':
        return { ...Typography.caption, fontSize: 10 };
      case 'medium':
        return { ...Typography.caption };
      case 'large':
        return { ...Typography.body2 };
    }
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: getBackgroundColor() },
        getPadding(),
        style,
      ]}
    >
      <Text
        style={[
          getFontSize(),
          { color: getTextColor() },
          textStyle,
        ]}
        numberOfLines={1}
      >
        {label}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 999,
    alignSelf: 'flex-start',
  },
});

export default Badge;