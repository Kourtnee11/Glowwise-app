import React from 'react';
import { Tabs } from 'expo-router';
import { Platform } from 'react-native';
import {
  Home,
  ClipboardList, 
  Beaker, 
  CalendarClock,
  Camera,
  ShoppingBag,
  MessageSquareText,
  User
} from 'lucide-react-native';
import Colors from '@/constants/Colors';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.primary.pinkDark,
        tabBarInactiveTintColor: Colors.neutral.gray5,
        tabBarLabelStyle: {
          fontFamily: 'Inter-Medium',
          fontSize: 12,
          marginBottom: Platform.OS === 'android' ? 8 : 0,
        },
        tabBarStyle: {
          backgroundColor: Colors.neutral.white,
          borderTopWidth: 1,
          borderTopColor: Colors.neutral.gray2,
          height: Platform.OS === 'android' ? 64 : 84,
          paddingTop: 8,
          paddingBottom: Platform.OS === 'android' ? 12 : 24,
        },
        tabBarIconStyle: {
          marginBottom: 0,
        },
        headerStyle: {
          backgroundColor: Colors.neutral.white,
          shadowColor: Colors.neutral.black,
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.05,
          shadowRadius: 1,
          elevation: 2,
        },
        headerTitleStyle: {
          fontFamily: 'Playfair-Bold',
          fontSize: 20,
          color: Colors.neutral.black,
        },
        headerShadowVisible: true,
        headerTitleAlign: 'center',
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => <Home size={size} color={color} />,
          headerTitle: 'GlowWise',
        }}
      />
      <Tabs.Screen
        name="quiz"
        options={{
          title: 'Skin Quiz',
          tabBarIcon: ({ color, size }) => <ClipboardList size={size} color={color} />,
          headerTitle: 'Skin Quiz',
        }}
      />
      <Tabs.Screen
        name="ingredients"
        options={{
          title: 'Ingredients',
          tabBarIcon: ({ color, size }) => <Beaker size={size} color={color} />,
          headerTitle: 'Ingredient Decoder',
        }}
      />
      <Tabs.Screen
        name="routines"
        options={{
          title: 'Routines',
          tabBarIcon: ({ color, size }) => <CalendarClock size={size} color={color} />,
          headerTitle: 'Skincare Routines',
        }}
      />
      <Tabs.Screen
        name="scanner"
        options={{
          title: 'Scanner',
          tabBarIcon: ({ color, size }) => <Camera size={size} color={color} />,
          headerTitle: 'Scan Product',
        }}
      />
      <Tabs.Screen
        name="shop"
        options={{
          title: 'Shop',
          tabBarIcon: ({ color, size }) => <ShoppingBag size={size} color={color} />,
          headerTitle: 'K-Beauty Shop',
        }}
      />
      <Tabs.Screen
        name="assistant"
        options={{
          title: 'Assistant',
          tabBarIcon: ({ color, size }) => <MessageSquareText size={size} color={color} />,
          headerTitle: 'AI Assistant',
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => <User size={size} color={color} />,
          headerTitle: 'My Profile',
        }}
      />
    </Tabs>
  );
}