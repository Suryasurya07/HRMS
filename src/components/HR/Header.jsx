import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt, faBell } from '@fortawesome/free-solid-svg-icons'; 
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import ClockInOut from '../../components/Employee/ClockInOut';
import Logout from '../../pages/LogoutPage/Logout'; // Import the Modal component

const headerVariants = {
  hidden: { opacity: 0, y: -50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

const Header = () => {
  const navigate = useNavigate();
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control the modal visibility

  useEffect(() => {
    const username = localStorage.getItem('username');

    const fetchEmployeeData = async () => {
      try {
        const response = await fetch('backend/employeeslist.json');
        const data = await response.json();

        if (data.employees && Array.isArray(data.employees)) {
          const currentEmployee = data.employees.find(emp => emp.credentials.username === username);

          if (currentEmployee) {
            setEmployee(currentEmployee);
          }
        }
      } catch (error) {
        console.error("Error fetching employee data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployeeData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    console.log("Logged out");
    navigate('/login');
  };

  const handleLogoutConfirmation = () => {
    setIsModalOpen(true); // Open the modal on logout button click
  };

  const confirmLogout = () => {
    handleLogout();
    setIsModalOpen(false); // Close the modal after logout
  };

  const cancelLogout = () => {
    setIsModalOpen(false); // Close the modal without logging out
  };

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 p-4 z-50 flex justify-between items-center "  // bg-transparent to remove the white background
        variants={headerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Left Section */}
        <div className="flex items-center space-x-4">
          {/* You can add additional content for the left section here */}
        </div>

        {/* Right Section: Notifications & ClockInOut & Logout */}
        <div className="absolute top-4 right-4 flex items-center space-x-4">
          {/* Notification Icon */}
          <motion.button
            className="text-gray-900 hover:text-gray-900"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <FontAwesomeIcon icon={faBell} className="text-xl" />
          </motion.button>

          <div className="flex items-center">
  {employee ? (
    <ClockInOut employee={employee} />
  ) : (
    <span>Loading...</span> // You can display a loading message or placeholder while the employee data is being fetched
  )}
</div>

          {/* Logout Button */}
          <motion.button
            className="bg-purple-600 text-white px-4 py-2 rounded flex items-center hover:bg-purple-700 transition duration-200 shadow-md"
            onClick={handleLogoutConfirmation} // Show the confirmation modal
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
            Logout
          </motion.button>
        </div>
      </motion.header>

      {/* Modal for logout confirmation */}
      <Logout 
        isOpen={isModalOpen} 
        onClose={cancelLogout} 
        onConfirm={confirmLogout} 
        message="Are you sure you want to log out?" 
      />
    </>
  );
};

export default Header;
