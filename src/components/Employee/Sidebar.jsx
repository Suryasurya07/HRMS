import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Home,
    ClipboardList,
    DollarSign,
    Calendar,
    Settings,
    FileText,
    Folder,
    Briefcase,
    Plane,
    Sliders,
    Menu // Importing the hamburger menu icon
} from 'lucide-react';

// Define motion variants
const sidebarVariants = {
    hidden: { x: -250 },
    visible: { x: 0 },
    exit: { x: -250 },
};

const itemVariants = {
    hover: { scale: 1.05 },
    tap: { scale: 0.95 },
};

const Sidebar = ({ onNavigate, selectedPage }) => {
    const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);

    // Directly fetch user data from localStorage
    const userName = "John Doe"; // Default name if token is not present
    const userImage = "../assets/companylogo.png";

    const toggleMobileSidebar = () => {
        setMobileSidebarOpen(!isMobileSidebarOpen);
    };

    const handleSelectPage = (page) => {
        onNavigate(page);
        if (window.innerWidth < 768) {
            setMobileSidebarOpen(false); // Close sidebar on mobile when a page is selected
        }
    };

    return (
        <div className=" relative mt-14">
            {/* Hamburger Menu (visible only on mobile) */}
            <button
                className={`absolute top-4 left-4 sm:hidden z-50 ${isMobileSidebarOpen ? 'hidden' : 'block'}`} // Hide button if sidebar is open
                onClick={toggleMobileSidebar}
                aria-label="Toggle sidebar"
            >
                <Menu className="w-6 h-6 text-white" />
            </button>

            {/* Sidebar */}
            <motion.div
                className={` text-white w-64 h-full p-4 shadow-lg rounded-l-xl flex flex-col overflow-y-auto scrollbar-hidden fixed top-0 left-0 z-50 transform transition-transform duration-300
                    ${isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
                    md:relative`} // Responsive classes
                initial="hidden"
                animate={isMobileSidebarOpen || window.innerWidth >= 768 ? "visible" : "hidden"}
                exit="exit"
                variants={sidebarVariants}
                transition={{ type: 'tween', duration: 0.1, ease: 'easeInOut' }}
                role="navigation"
            >
                {/* Profile Section */}
                

                {/* Navigation Items */}
                <div className="flex-grow space-y-2 overflow-hidden">
                    <SidebarItem icon={<Home />} label="Home" onClick={() => handleSelectPage('home')} isSelected={selectedPage === 'home'} />
                    <SidebarItem icon={<ClipboardList />} label="Tasks" onClick={() => handleSelectPage('tasks')} isSelected={selectedPage === 'tasks'} />
                    <SidebarItem icon={<DollarSign />} label="Salary Management" onClick={() => handleSelectPage('salarymanagement')} isSelected={selectedPage === 'salarymanagement'} />

                    <SidebarItem icon={<Calendar />} label="Leave" onClick={() => handleSelectPage('leave')} isSelected={selectedPage === 'leave'} />
                    <SidebarItem icon={<Folder />} label="Files" onClick={() => handleSelectPage('files')} isSelected={selectedPage === 'files'} />
                    <SidebarItem icon={<Sliders />} label="Office Guidelines" onClick={() => handleSelectPage('office-guidelines')} isSelected={selectedPage === 'office-guidelines'} />
                    <SidebarItem icon={<Briefcase />} label="Exit Management" onClick={() => handleSelectPage('exit-management')} isSelected={selectedPage === 'exit-management'} />
                    <SidebarItem icon={<Plane />} label="Travel" onClick={() => handleSelectPage('travel')} isSelected={selectedPage === 'travel'} />
                </div>

                {/* Settings Button at the Bottom */}
                <SidebarItem 
                    icon={<Settings />} 
                    label="Settings" 
                    onClick={() => handleSelectPage('settings')} 
                    isSelected={selectedPage === 'settings'} 
                    className="mt-auto"
                />
            </motion.div>
        </div>
    );
};

const SidebarItem = ({ icon, label, onClick, isSelected, className }) => (
    <motion.div
        className={` flex items-center space-x-2 cursor-pointer transition duration-200 p-2 rounded-lg ${className}`}
        onClick={onClick}
        whileHover={itemVariants.hover}
        whileTap={itemVariants.tap}
        role="button"
        aria-pressed={isSelected}
    >
        {icon}
        <span className={`font-medium text-sm `}>{label}</span> {/* Reduced font size */}
    </motion.div>
);

export default Sidebar;
