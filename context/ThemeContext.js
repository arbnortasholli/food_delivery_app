import React, { createContext, useContext, useState, useEffect } from 'react';
import { Appearance } from 'react-native';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const colorScheme = Appearance.getColorScheme(); 
  const [isDark, setIsDark] = useState(colorScheme === 'dark');

  const lightTheme = {
    mode: 'light',
    background: '#FFF8F0',
    text: '#333333',
    card: '#FFFFFF',
    primary: '#FF7F00',
    accent: '#FFB266',
    border: '#E2E2E2',
  };

  const darkTheme = {
    mode: 'dark',
    background: '#121212',
    text: '#FFFFFF',
    card: '#1F1F1F',
    primary: '#FF7F00',
    accent: '#FFB266',
    border: '#333333',
  };

  const theme = isDark ? darkTheme : lightTheme;

  const toggleTheme = () => setIsDark(!isDark);

  return (
    <ThemeContext.Provider value={{ colors: theme, isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);