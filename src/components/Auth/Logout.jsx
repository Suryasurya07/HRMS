// src/components/Auth/Logout.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token'); // Remove the token
        navigate('/'); // Redirect to the login page
    };

    return (
        <button onClick={handleLogout} className="text-red-500">Logout</button>
    );
};

export default Logout;
