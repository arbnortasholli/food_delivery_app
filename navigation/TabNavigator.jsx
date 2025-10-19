import React from 'react';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { TouchableOpacity, View } from 'react-native';
function TabBar({ props }) {
  const { colors } = useTheme();

  const getTabIcon = (routeName, isFocused) => {
    const iconColor = isFocused ? colors.primary : colors.text;
    const iconSize = isFocused ? 28 : 24;

    switch (routeName) {
      case 'index':
        return <Ionicons name="home" color={iconColor} size={iconSize} />;
      case 'OrderPage':
        return <Ionicons name="cart" color={iconColor} size={iconSize} />;
      case 'ProfilePage':
        return <Ionicons name="person" color={iconColor} size={iconSize} />;
      default:
        return <Ionicons name="home" color={iconColor} size={iconSize} />;
    }
  };

  const visibleTabs = [
    { name: 'index', label: 'Home' },
    { name: 'OrderPage', label: 'Orders' },
    { name: 'ProfilePage', label: 'Profile' }
  ];

  return (
    <View
      style={{
        position: "absolute",
        bottom: 20,
        height: 55,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        width: "90%",
        alignSelf: "center",
        borderRadius: 38,
        elevation: 5,
        backgroundColor: colors.card,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 5 },
        shadowRadius: 10,
      }}
    >
      {visibleTabs.map((tab, index) => {
        const isFocused = props.state.index === index;

        return (
          <TouchableOpacity
            key={tab.name}
            onPress={() => props.navigation.navigate(tab.name)}
            style={{ alignItems: "center", justifyContent: "center" }}
            activeOpacity={0.8}
          >
            <View
              style={{
                width: 50,
                height: 50,
                borderRadius: 25,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: isFocused ? "rgba(255,255,255,0.2)" : "transparent",
              }}
            >
              {getTabIcon(tab.name, isFocused)}
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

export default function TabNavigator() {
  const { colors } = useTheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
      }}
      tabBar={(props) => <TabBar props={props} />}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarLabel: 'Home',
        }}
      />
      <Tabs.Screen
        name="OrderPage"
        options={{
          tabBarLabel: 'Orders',
        }}
      />
      <Tabs.Screen
        name="ProfilePage"
        options={{
          tabBarLabel: 'Profile',
        }}
      />
    </Tabs>
  );
}