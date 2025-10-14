import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Main from '../screens/MainPage';
import Order from '../screens/OrderPage';
import Profile from '../screens/ProfilePage';
import { useTheme } from '../context/ThemeContext';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  const { colors } = useTheme();


  const CustomTabBarButton = ({ children, onPress }) => (
    <TouchableOpacity
      style={{
        top: -10,
        justifyContent: 'center',
        alignItems: 'center',
        ...Platform.select({
          ios: { shadowColor: '#000', shadowOpacity: 0.1, shadowOffset: { width: 0, height: 3 }, shadowRadius: 3 },
          android: { elevation: 3 },
        }),
      }}
      onPress={onPress}
    >
      <View
        style={{
          width: 60,
          height: 60,
          borderRadius: 30,
          backgroundColor: colors.primary,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {children}
      </View>
    </TouchableOpacity>
  );

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
        tabBarStyle: {
          position: 'absolute',
          bottom: 10,
          left: 10,
          right: 10,
          elevation: 0,
          backgroundColor: colors.card,
          borderRadius: 20,
          height: 70,
          paddingBottom: 5,
          paddingTop: 5,
          ...Platform.select({
            ios: {
              shadowColor: '#000',
              shadowOpacity: 0.06,
              shadowOffset: { width: 0, height: 10 },
              shadowRadius: 10,
            },
            android: { elevation: 5 },
          }),
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.text,
      }}
    >
      <Tab.Screen
  name="Home"
  component={Main}   
  options={{
    tabBarIcon: ({ color, size }) => <Ionicons name="home" color={color} size={size} />,
  }}
/>
<Tab.Screen
  name="Orders"
  component={Order} 
  options={{
    tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="cart" color={color} size={size} />,
  }}
/>
<Tab.Screen
  name="Profile"
  component={Profile} 
  options={{
    tabBarIcon: ({ color, size }) => <Ionicons name="person" color={color} size={size} />,
  }}
/>

    </Tab.Navigator>
  );
}
