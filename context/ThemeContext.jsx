// context/ThemeContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Appearance } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Colors from '../constants/Colors';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const systemScheme = Appearance.getColorScheme();
    const [userPreference, setUserPreference] = useState('light'); // Default light për të gjithë
    const [systemTheme, setSystemTheme] = useState(systemScheme);
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

    useEffect(() => {
        const listener = Appearance.addChangeListener(({ colorScheme }) => {
            setSystemTheme(colorScheme);
        });
        return () => listener.remove();
    }, []);

    // Kur useri është i loguar, përdor preferencën e tij (mund të jetë system, light, ose dark)
    // Kur useri nuk është i loguar, përdor gjithmonë light mode
    const getEffectiveTheme = () => {
        if (!isUserLoggedIn) {
            return 'light'; // Gjithmonë light për të paloguar
        }
        
        // Për të loguar, përdor preferencën e userit
        if (userPreference === null) {
            return systemTheme; // System mode
        }
        return userPreference;
    };

    const effectiveTheme = getEffectiveTheme();
    const isDarkMode = effectiveTheme === 'dark';

    const theme = isDarkMode ? Colors.dark : Colors.light;
    
    const setLightMode = () => {
        if (isUserLoggedIn) {
            setUserPreference('light');
        }
    };
    
    const setDarkMode = () => {
        if (isUserLoggedIn) {
            setUserPreference('dark');
        }
    };
    
    const setSystemMode = () => {
        if (isUserLoggedIn) {
            setUserPreference(null);
        }
    };

    // Funksione për menaxhimin e statusit të login
    const setUserLoggedIn = () => {
        setIsUserLoggedIn(true);
        // Kur useri logohet për herë të parë, vendos system mode si default
        if (userPreference === 'light') {
            setUserPreference(null);
        }
    };

    const setUserLoggedOut = () => {
        setIsUserLoggedIn(false);
        setUserPreference('light'); // Reset to light mode
    };

    const value = {
        colors: theme,
        isDark: isDarkMode,
        colorScheme: isDarkMode ? 'dark' : 'light',
        userPreference: isUserLoggedIn ? userPreference : 'light',
        setLightMode,
        setDarkMode,
        setSystemMode,
        setUserLoggedIn,
        setUserLoggedOut,
        isUserLoggedIn,
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