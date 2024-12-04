// src/components/Auth/Register.jsx
import React, { useState, useEffect } from 'react';

// Assuming you want to load the initial user data
const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [users, setUsers] = useState([]);

    useEffect(() => {
        // Load user data from the JSON file
        const loadData = async () => {
            const response = await fetch('/data/RegisterData.json'); // Adjust the path as needed
            const data = await response.json();
            setUsers(data);
        };
        loadData();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        // Check if the username already exists
        const existingUser = users.find(user => user.username === username);
        if (existingUser) {
            setError('Username already exists');
            return;
        }

        // You would typically send the new user to a backend here
        const newUser = { username, password };
        setUsers([...users, newUser]); // Update state with the new user
        console.log('User registered:', newUser);
        // Optionally, redirect to the login page or show a success message
    };

    return (
        <div className="bg-white p-6 rounded shadow-md w-96">
            <h2 className="text-2xl font-semibold text-center mb-4">Register</h2>
            {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Username:</label>
                    <input 
                        type="text" 
                        className="border border-gray-300 rounded-lg p-2 w-full" 
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required 
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Password:</label>
                    <input 
                        type="password" 
                        className="border border-gray-300 rounded-lg p-2 w-full" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required 
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Confirm Password:</label>
                    <input 
                        type="password" 
                        className="border border-gray-300 rounded-lg p-2 w-full" 
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required 
                    />
                </div>
                <button 
                    type="submit" 
                    className="w-full bg-blue-600 text-white font-semibold rounded-lg p-2 transition duration-200 hover:bg-blue-500"
                >
                    Register
                </button>
            </form>
        </div>
    );
};

export default Register;
