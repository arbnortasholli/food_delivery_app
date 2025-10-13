import React, { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const colors = isDarkMode
    ? { background: '#121212', text: '#FFFFFF', card: '#1E1E1E' }
    : { background: '#FFFFFF', text: '#000000', card: '#F3F3F3' };

  return (
    <ThemeContext.Provider value={{ colors, isDarkMode, setIsDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
