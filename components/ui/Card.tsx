import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import Colors from '@/constants/Colors';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  elevation?: 'none' | 'small' | 'medium' | 'large';
  padding?: 'none' | 'small' | 'medium' | 'large';
  borderRadius?: 'none' | 'small' | 'medium' | 'large';
}

const Card: React.FC<CardProps> = ({
  children,
  style,
  elevation = 'small',
  padding = 'medium',
  borderRadius = 'medium',
}) => {
  // Helper to get elevation style
  const getElevationStyle = (): ViewStyle => {
    switch (elevation) {
      case 'none':
        return {};
      case 'small':
        return {
          shadowColor: Colors.neutral.black,
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.1,
          shadowRadius: 2,
          elevation: 2,
        };
      case 'medium':
        return {
          shadowColor: Colors.neutral.black,
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.15,
          shadowRadius: 4,
          elevation: 4,
        };
      case 'large':
        return {
          shadowColor: Colors.neutral.black,
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.2,
          shadowRadius: 8,
          elevation: 8,
        };
    }
  };

  // Helper to get padding
  const getPaddingStyle = (): ViewStyle => {
    switch (padding) {
      case 'none':
        return { padding: 0 };
      case 'small':
        return { padding: 8 };
      case 'medium':
        return { padding: 16 };
      case 'large':
        return { padding: 24 };
    }
  };

  // Helper to get border radius
  const getBorderRadiusStyle = (): ViewStyle => {
    switch (borderRadius) {
      case 'none':
        return { borderRadius: 0 };
      case 'small':
        return { borderRadius: 8 };
      case 'medium':
        return { borderRadius: 16 };
      case 'large':
        return { borderRadius: 24 };
    }
  };

  return (
    <View
      style={[
        styles.container,
        getElevationStyle(),
        getPaddingStyle(),
        getBorderRadiusStyle(),
        style,
      ]}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.neutral.white,
    overflow: 'hidden',
  },
});

export default Card;