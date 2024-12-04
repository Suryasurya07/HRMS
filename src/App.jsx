// src/App.jsx
import React from 'react';
import { ThemeProvider } from './ThemeContext';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import EmployeeDashboard from './pages/Employee/EmployeeDashboard';
import Login from './pages/LoginPage/Login';
import HRDashboard from './pages/HR/HRDashboard';
import { pageTransitionVariants } from './variants'; // Import the animation variants
import StarCanvas from './components/canvas/StarCanvas';

const AppContent = () => {
    const location = useLocation(); // Now, useLocation() is within <Router>

    return (
        <AnimatePresence mode="wait">
            
            
            <motion.div className='page-background'
                key={location.pathname}
                initial="initial"
                animate="animate"
                exit="exit"
                variants={pageTransitionVariants}
                style={{ position: "relative", zIndex: 1 }}
            >
                <Routes location={location} key={location.pathname}>
                    <Route path="/" element={<Login />} />
                    <Route path="/employeedashboard" element={<EmployeeDashboard />} />
                    <Route path="/HRdashboard" element={<HRDashboard />} />
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
                
            </motion.div>
        </AnimatePresence>
    );
};

const App = () => {
    return (
        
        <ThemeProvider>
            <Router>
                <AppContent />
            </Router>
        </ThemeProvider>
    );
};

export default App;
