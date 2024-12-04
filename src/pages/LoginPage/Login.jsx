import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react'; 
import { FaUserAlt, FaLock } from 'react-icons/fa'; 
import { motion } from 'framer-motion'; 
import CompanyLogo from '../../../src/assets/companylogo.png'; 
import BackgroundImage from '../../../src/assets/herobg.png'; 
import EarthCanvas from '../../../src/components/canvas/EarthCanvas';
import StarCanvas from '../../../src/components/canvas/StarCanvas';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false); 
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login state
    const navigate = useNavigate();

    // Define start and end position for the bird animation
    const startPosition = { x: 0, y: 0 }; 
    const endPosition = { x: 500, y: 0 };  // Update this as per your layout

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        try {
            // Send a POST request to the login API with the username and password
            const response = await fetch('http://localhost:5000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });
    
            const data = await response.json();
    
            // If login is successful, store the token and username in localStorage
            if (response.ok) {
                localStorage.setItem('token', data.token); // Store token securely
                localStorage.setItem('username', username);
    
                setIsLoggedIn(true); // Trigger the login state
    
                // Redirect to the appropriate dashboard after a short delay for the animation
                setTimeout(() => {
                    if (username.toLowerCase().startsWith('emp')) {
                        navigate('/employeedashboard'); // Redirect to employee dashboard
                    } else if (username.toLowerCase().startsWith('hr')) {
                        navigate('/HRdashboard'); // Redirect to HR dashboard
                    }
                }, 100); // Delay to show animation
            } else {
                setError(data.message); // Set error message if login fails
            }
        } catch (err) {
            setError('Error logging in'); // Set a generic error message if something goes wrong
            console.error(err);
        }
    };
    

    return (
        <div className="relative flex justify-center items-center min-h-screen bg-cover bg-center font-sans overflow-hidden">
            {/* <div className="absolute inset-0 z-0">
                <StarCanvas />
            </div> */}

            <motion.div
                className="flex justify-center items-center min-h-screen bg-cover bg-center font-sans relative z-10 space-y-12 md:space-y-0 md:space-x-16"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
            >
                <div className="flex justify-center items-center space-x-40 w-full">

                    <motion.div
                        className="p-10 rounded-3xl shadow-lg max-w-sm relative z-10 w-96"
                        initial={{ scale: 0.95 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="text-center mb-6">
                            <img src={CompanyLogo} alt="Company Logo" className="w-24 mx-auto" />
                        </div>

                        <h2 className="font-serif text-3xl font-bold mb-2 text-center text-white">Welcome Back</h2>
                        <p className="text-sm text-center text-gray-400 mb-4">Please sign in to continue</p>

                        {error && <p className="text-red-400 text-sm text-center mb-4">{error}</p>}
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-400">Username:</label>
                                <div className="relative">
                                    <FaUserAlt className="absolute left-3 top-3 text-gray-400" />
                                    <input
                                        type="text"
                                        className="border-2 border-gray-300 rounded-xl p-3 pl-10 w-full bg-gray-100 text-gray-800 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-600 focus:shadow-lg transition duration-200"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-400">Password:</label>
                                <div className="relative">
                                    <FaLock className="absolute left-3 top-3 text-gray-400" />
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        className="border-2 border-gray-300 rounded-xl p-3 pl-10 w-full bg-gray-100 text-gray-800 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-600 focus:shadow-lg transition duration-200"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                    <button
                                        type="button"
                                        className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? <EyeOff /> : <Eye />}
                                    </button>
                                </div>
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-sky-600 text-white font-semibold rounded-xl py-3 hover:bg-sky-500 transition duration-200"
                            >
                                Sign In
                            </button>
                            <div className="mt-4 text-sm text-center">
                                <a href="#" className="text-sky-400 hover:underline">Forgot your password?</a>
                            </div>
                        </form>
                    </motion.div>

                    {/* Display Bird Animation when logged in */}
                   

                    <div className="relative w-[500px] h-[500px]">
                        <EarthCanvas />
                    </div>

                    {/* <div className="relative h-[500px] max-w-xl">
                        <StarCanvas />
                    </div> */}

                    
                    
                         
                    
                </div>
            </motion.div>
        </div>
    );
};

export default Login;
