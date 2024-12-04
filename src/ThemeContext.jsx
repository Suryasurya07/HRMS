// src/ThemeContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const ThemeContext = createContext();

const themeVariants = {
    light: {
        opacity: 1,
        transition: { duration: 0.5 },
    },
    dark: {
        opacity: 1,
        transition: { duration: 0.5 },
    },
};

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme); // Store the theme in localStorage
    };

    useEffect(() => {
        document.body.classList.toggle('dark', theme === 'dark');
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            <motion.div
                className={theme === 'light' ? 'bg-background text-textPrimary' : 'bg-gray-900 text-gray-200'}
                initial={theme === 'light' ? 'light' : 'dark'}
                animate={theme}
                variants={themeVariants}
            >
                {children}
            </motion.div>
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);
