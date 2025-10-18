// context/ThemeContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Appearance } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Colors from '../constants/Colors';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const systemScheme = Appearance.getColorScheme();
    const [userPreference, setUserPreference] = useState(null);
    const [systemTheme, setSystemTheme] = useState(systemScheme);

    useEffect(() => {
        const listener = Appearance.addChangeListener(({ colorScheme }) => {
            setSystemTheme(colorScheme);
        });
        return () => listener.remove();
    }, []);

    const isDarkMode = userPreference === null ? systemTheme === 'dark' : userPreference === 'dark';

    const theme = isDarkMode ? Colors.dark : Colors.light;
    const setLightMode = () => setUserPreference('light');
    const setDarkMode = () => setUserPreference('dark');
    const setSystemMode = () => setUserPreference(null);

    const value = {
        colors: theme,
        isDark: isDarkMode,
        colorScheme: isDarkMode ? 'dark' : 'light',
        userPreference,
        setLightMode,
        setDarkMode,
        setSystemMode,
    };

    return (
        <ThemeContext.Provider value={value}>
            <StatusBar style={isDarkMode ? 'light' : 'dark'} />
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};