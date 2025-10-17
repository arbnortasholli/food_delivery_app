import React from 'react';
import { Tabs } from 'expo-router';
import { ThemeProvider } from '../context/ThemeContext';
import { CartProvider } from '../context/CartContext';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import TabNavigator from '../navigation/TabNavigator';

export default function Layout() {
    return (
        <ThemeProvider>
            <CartProvider>
                <TabNavigator />
            </CartProvider>
        </ThemeProvider>
    );
}
