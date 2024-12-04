import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    Home,
    Users,
    ClipboardList,
    Calendar,
    DollarSign,
    Briefcase,
    Building,
    UserCheck,
    LogOut,
    TrendingUp,
    Settings,
    UserPlus,
    MapPin,
    Menu, // Importing Menu icon for the hamburger button
} from 'lucide-react';

const sidebarVariants = {
    hidden: { x: -250 },
    visible: { x: 0 },
    exit: { x: -250 },
};

const Sidebar = ({ onSelectPage, selectedPage }) => {
    const [leaveRequestCount, setLeaveRequestCount] = useState(0);
    const [clockInCount, setClockInCount] = useState(0); // State for clock-in permission count
    const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State for sidebar visibility

    // Simulating fetching leave requests and clock-in permissions count from an API
    useEffect(() => {
        const fetchRequests = async () => {
            const leaveRequests = await new Promise((resolve) => {
                setTimeout(() => {
                    resolve(5); // Assume we get 5 leave requests
                }, 1000);
            });
            setLeaveRequestCount(leaveRequests);

            const clockIns = await new Promise((resolve) => {
                setTimeout(() => {
                    resolve(3); // Assume we get 3 clock-in permissions
                }, 1000);
            });
            setClockInCount(clockIns);
        };

        fetchRequests();
    }, []); // Fetch counts when component mounts

    const handlePageSelection = (page) => {
        onSelectPage(page);
        if (window.innerWidth < 768) {
            setIsSidebarOpen(false); // Close sidebar on mobile when a page is selected
        }
    };

    const toggleSidebar = () => {
        setIsSidebarOpen((prev) => !prev);
    };

    const SidebarItem = ({ icon, label, page, notificationCount }) => (
        <motion.div
    className={`flex items-center space-x-2 cursor-pointer p-2 rounded-lg transition duration-200 
        text-gray-200`} // Removed conditional background and kept the default text color
    onClick={() => handlePageSelection(page)}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    role="button"
    aria-pressed={selectedPage === page}
    tabIndex={0}
    onKeyDown={(e) => e.key === 'Enter' && handlePageSelection(page)}
>
    {React.cloneElement(icon, { className: 'h-5 w-5' })}
    <span className="text-sm font-medium">{label}</span>
    {notificationCount > 0 && (
        <span className="ml-2 bg-red-500 text-white text-xs rounded-full px-2">{notificationCount}</span>
    )}
</motion.div>

    );

    return (
        <div className=" relative mt-14">
            {/* Button to toggle sidebar on mobile */}
            <button
                className="md:hidden fixed top-4 left-4 z-50 p-2 bg-purple-800 text-white rounded-md focus:outline-none"
                onClick={toggleSidebar}
                aria-label="Toggle Sidebar"
            >
                <Menu className="h-6 w-6" />
            </button>

            <motion.div
                className={` text-white w-64 h-full p-4 shadow-lg rounded-l-xl flex flex-col fixed top-0 left-0 z-40 md:relative transition-transform duration-300 
                ${isSidebarOpen || window.innerWidth >= 768 ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`} // Updated background color to dark grey

                initial="hidden"
                animate={isSidebarOpen || window.innerWidth >= 768 ? "visible" : "hidden"}
                exit="exit"
                variants={sidebarVariants}
                transition={{ type: 'tween', duration: 0.1, ease: 'easeInOut' }}

                role="navigation"
                aria-label="Main Navigation"
            >
                {/* Profile Section */}
                <div className="flex flex-col items-center mb-6">
                    <motion.img
                        src="https://via.placeholder.com/50"
                        alt="Profile"
                        className="w-12 h-12 rounded-full mb-2 border-2 border-gray-600"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.2 }}
                    />
                    <h2 className="text-sm font-semibold">John Doe</h2>
                    <p className="text-xs text-gray-400">HR Manager</p>
                </div>

                {/* Navigation Items */}
                <div className="space-y-2 flex-grow">
                    <SidebarItem icon={<Home />} label="Home" page="home" />
                    <SidebarItem icon={<Users />} label="Employees" page="employees" />
                    <SidebarItem icon={<Calendar />} label="Attendance" page="attendance" />
                    <SidebarItem icon={<ClipboardList />} label="Tasks" page="tasks" />

                    {/* Requests Option with Sub-Options */}
                    <div className="flex flex-col">
                        <SidebarItem icon={<ClipboardList />} label="Requests" page="requests" />
                        <div className="ml-4 space-y-1">
                            <SidebarItem icon={<Calendar />} label="Leave Requests" page="leave-requests" notificationCount={leaveRequestCount} />
                            <SidebarItem icon={<Calendar />} label="Clock In Permissions" page="clock-in-permissions" notificationCount={clockInCount} />
                        </div>
                    </div>

                    <SidebarItem icon={<DollarSign />} label="Payroll" page="payroll" />
                    <SidebarItem icon={<Briefcase />} label="Projects" page="projects" />
                    <SidebarItem icon={<Building />} label="Clients" page="clients" />
                    <SidebarItem icon={<UserCheck />} label="Onboarding" page="onboarding" />
                    <SidebarItem icon={<LogOut />} label="Exit Management" page="exit-management" />
                    <SidebarItem icon={<TrendingUp />} label="Performance" page="performance" />
                    <SidebarItem icon={<UserPlus />} label="Add Employee" page="addEmployee" />
                    <SidebarItem icon={<MapPin />} label="Location" page="location" />
                </div>

                {/* Settings Button at the Bottom */}
                <div className="mt-4">
                    <SidebarItem icon={<Settings />} label="Settings" page="settings" />
                </div>
            </motion.div>
        </div>
    );
};

export default Sidebar;
