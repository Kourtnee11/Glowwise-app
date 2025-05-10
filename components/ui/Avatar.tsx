import React from 'react';
import { View, Image, Text, StyleSheet, ViewStyle } from 'react-native';
import Colors from '@/constants/Colors';
import Typography from '@/constants/Typography';

interface AvatarProps {
  source?: string;
  name?: string;
  size?: 'small' | 'medium' | 'large';
  style?: ViewStyle;
}

const Avatar: React.FC<AvatarProps> = ({
  source,
  name,
  size = 'medium',
  style,
}) => {
  // Get size dimensions
  const getDimensions = (): number => {
    switch (size) {
      case 'small':
        return 32;
      case 'medium':
        return 48;
      case 'large':
        return 64;
    }
  };

  // Get font size
  const getFontSize = (): number => {
    switch (size) {
      case 'small':
        return 12;
      case 'medium':
        return 16;
      case 'large':
        return 20;
    }
  };

  // Get initials from name
  const getInitials = (): string => {
    if (!name) return '';
    
    const parts = name.split(' ');
    if (parts.length === 1) {
      return parts[0].charAt(0).toUpperCase();
    }
    return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
  };

  const dimensions = getDimensions();
  const fontSize = getFontSize();

  return (
    <View
      style={[
        styles.container,
        {
          width: dimensions,
          height: dimensions,
          borderRadius: dimensions / 2,
        },
        style,
      ]}
    >
      {source ? (
        <Image
          source={{ uri: source }}
          style={[
            styles.image,
            {
              width: dimensions,
              height: dimensions,
              borderRadius: dimensions / 2,
            },
          ]}
        />
      ) : (
        <Text
          style={[
            styles.initials,
            {
              fontSize: fontSize,
              lineHeight: dimensions,
            },
          ]}
        >
          {getInitials()}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary.pinkLight,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  initials: {
    color: Colors.primary.pinkDark,
    fontFamily: 'Inter-SemiBold',
    textAlign: 'center',
  },
});

export default Avatar;