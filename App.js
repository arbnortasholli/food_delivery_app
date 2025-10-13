
import React from 'react';
import { Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainPage from './screens/MainPage';
import OrderPage from './screens/OrderPage';
import ProfilePage from './screens/ProfilePage';
import { ThemeProvider, useTheme } from './theme/ThemeContext';

const Stack = createNativeStackNavigator();

function AppNavigator() {
  const { isDark, toggleTheme, colors } = useTheme();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Main"
          component={MainPage}
          options={{
            title: 'FoodExpress 🍴',
            headerRight: () => (
              <Button
                onPress={toggleTheme}
                title={isDark ? '☀️' : '🌙'}
                color={colors.primary}
              />
            ),
          }}
        />
        <Stack.Screen name="Order" component={OrderPage} options={{ title: 'Your Orders 🛒' }} />
        <Stack.Screen name="Profile" component={ProfilePage} options={{ title: 'Your Profile 👤' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppNavigator />
    </ThemeProvider>
  );
}

