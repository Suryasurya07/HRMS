// src/components/Navbar.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../api/authApi"; // Ensure you have the logout function defined in this path

// Adjust the path as necessary

const Navbar = () => {
    const navigate = useNavigate();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const handleLogout = async () => {
        try {
            await logout(); // Call the logout API
            localStorage.removeItem("token");
            localStorage.removeItem("userData");
            toast.success("Logged out successfully");
            navigate("/login"); // Redirect to login
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    // Redirect if not authenticated
    if (!localStorage.getItem("userData")) {
        if (window.location.pathname !== "/login" && window.location.pathname !== "/register") {
            navigate("/login");
        }
    } else {
        if (window.location.pathname === "/login" || window.location.pathname === "/register") {
            navigate("/dashboard");
        }
    }

    return (
        <header className="bg-white shadow sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
                <div className="flex items-center justify-between w-full lg:w-auto">
                    <img src={mainLogo} alt="Company Logo" className="h-8" />
                    <button
                        className="lg:hidden text-gray-600 hover:text-gray-800 focus:outline-none"
                        onClick={toggleMobileMenu}
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}
                            ></path>
                        </svg>
                    </button>
                </div>

                <nav className="hidden lg:flex space-x-4">
                    {localStorage.getItem("token") && (
                        <ul className="flex space-x-4">
                            <li>
                                <Link to="/dashboard" className="text-gray-600 hover:text-gray-800 px-3 py-2 rounded-md text-base font-medium">
                                    Dashboard
                                </Link>
                            </li>
                            <li>
                                <Link to="/employees" className="text-gray-600 hover:text-gray-800 px-3 py-2 rounded-md text-base font-medium">
                                    Employee Management
                                </Link>
                            </li>
                            <li>
                                <Link to="/attendance" className="text-gray-600 hover:text-gray-800 px-3 py-2 rounded-md text-base font-medium">
                                    Attendance Management
                                </Link>
                            </li>
                            <li>
                                <Link to="/salaries" className="text-gray-600 hover:text-gray-800 px-3 py-2 rounded-md text-base font-medium">
                                    Salary
                                </Link>
                            </li>
                        </ul>
                    )}
                </nav>

                <div className="hidden lg:flex items-center space-x-4">
                    <span className="font-semibold text-sm">{localStorage.getItem("token") ? moment().format("dddd, MMMM Do YYYY") : ""}</span>
                    <button className="text-gray-600 hover:text-gray-800" onClick={handleLogout}>
                        {localStorage.getItem("userData") ? "Logout" : ""}
                    </button>
                </div>
            </div>

            {isMobileMenuOpen && (
                <div className="lg:hidden bg-white shadow-md">
                    <nav>
                        {localStorage.getItem("token") && (
                            <ul className="flex flex-col space-y-2 p-4">
                                <li>
                                    <Link to="/dashboard" className="text-gray-600 hover:text-gray-800 block px-3 py-2 rounded-md text-base font-medium">
                                        Dashboard
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/employees" className="text-gray-600 hover:text-gray-800 block px-3 py-2 rounded-md text-base font-medium">
                                        Employee Management
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/attendance" className="text-gray-600 hover:text-gray-800 block px-3 py-2 rounded-md text-base font-medium">
                                        Attendance Management
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/salaries" className="text-gray-600 hover:text-gray-800 block px-3 py-2 rounded-md text-base font-medium">
                                        Salary
                                    </Link>
                                </li>
                            </ul>
                        )}
                    </nav>
                    <div className="flex flex-col items-center space-y-2 p-4">
                        <span className="block font-semibold text-sm">{localStorage.getItem("token") ? moment().format("dddd, MMMM Do YYYY") : ""}</span>
                        <button className="block text-gray-600 hover:text-gray-800" onClick={handleLogout}>
                            {localStorage.getItem("userData") ? "Logout" : ""}
                        </button>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Navbar;
