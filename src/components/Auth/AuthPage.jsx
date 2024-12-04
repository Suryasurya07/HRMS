import React, { useState } from 'react';
import Login from '../../pages/LoginPage/Login'; // Ensure the path is correct
import Register from '../../pages/Employee/Register'; // Ensure the path is correct


const AuthPage = () => {
    const [showLogin, setShowLogin] = useState(true);

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-96">
                {showLogin ? <Login /> : <Register />}
                <div className="text-center mt-4">
                    <button 
                        className="text-blue-600 hover:underline" 
                        onClick={() => setShowLogin(!showLogin)}
                    >
                        {showLogin ? 'Create an account' : 'Already have an account? Log in'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AuthPage;
