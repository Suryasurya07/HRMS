import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Header from '../../components/Employee/Header';
import Sidebar from '../../components/Employee/Sidebar';
import LeaveRequestForm from '../HR/LeaveRequestForm';
import PayrollChart from '../../pages/Employee/PayrollChart';
import AttendancePage from '../../components/Employee/AttendancePage';
import Dialog from '../../components/Employee/Dialog';
import DashboardCalendar from './DashboardCalendar';
import Guidelines from '/src/components/Employee/Guidelines';
import SalaryManagement from '../../components/HR/SalaryManagement';
import Tasks from '../../components/Employee/Tasks';
import companylogo from '../../assets/companylogo.png';
import StarCanvas from '../../components/canvas/StarCanvas';

import { User, FileText, Bell, Briefcase, Users,Clock,Eye } from 'lucide-react';
import employeesList from '/backend/employeeslist.json';

const containerVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const Dashboard = () => {
  const [selectedPage, setSelectedPage] = useState('home');
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [dialogContent, setDialogContent] = useState({ title: '', children: null });
  const [userProfile, setUserProfile] = useState({});
  const [darkMode, setDarkMode] = useState(false);
  const toggleDarkMode = () => setDarkMode(!darkMode);

  

  const handleNavigate = (page) => {
    setSelectedPage(page);
  };

  useEffect(() => {
    const employees = Array.isArray(employeesList) ? employeesList : [];
    const username = 'currentUser';
    const user = employees.find((employee) => employee.username === username);
    setUserProfile(user || { name: 'User', employeeRole: 'Employee', contact: 'user@example.com' });
  }, []);

  const leaveBalance = 10;
  const recentActivities = [
    "Applied for leave on 10/15",
    "Viewed payslip for September",
    "Updated personal details"
  ];

  const announcements = [
    "Team meeting on Friday at 3 PM.",
    "Company picnic scheduled for next month.",
    "New health insurance options available."
  ];

  const upcomingHolidays = [
    { date: '2024-11-01', name: 'Diwali' },
    { date: '2024-12-25', name: 'Christmas' },
    { date: '2025-01-01', name: 'New Year\'s Day' }
  ];

  const birthdays = [
    { name: 'Alice', date: '2024-10-20' },
    { name: 'Bob', date: '2024-10-25' },
    { name: 'Charlie', date: '2024-11-05' }
  ];

  const currentProjects = [
    {
      name: "Project A",
      manager: "John Doe",
      team: ["Alice", "Bob", "Charlie"],
      timeline: "Q4 2024",
      description: "A detailed description of Project A with critical milestones and deliverables.",
      inProgress: true
    },
    {
      name: "Project B",
      manager: "Jane Smith",
      team: ["Eve", "Frank"],
      timeline: "Q1 2025",
      description: "An overview of Project B aimed at enhancing product performance.",
      inProgress: true
    }
  ];

  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  if (inView) {
    controls.start('visible');
  }

  const renderContent = () => {
    switch (selectedPage) {
      case 'leave':
        return <LeaveRequestForm />;
      case 'payroll':
        return <PayrollChart />;
      case 'attendanceinfo':
        return <AttendancePage />;
      case 'office-guidelines':
        return <Guidelines />;
      case 'salarymanagement':
        return <SalaryManagement />;
      case 'tasks':
        return <Tasks />;
      default:
        return renderDashboard();
    }
  };

  const renderDashboard = () => (
    <motion.div
      className="p-6 bg-brand text-white rounded-lg shadow-lg "
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={containerVariants}
      layout
    >
      <h1 className="font-sans text-xl font-medium mb-4">
        Welcome to the Dashboard, {userProfile.name || "User"}!
      </h1>
  
      <div className=" grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mb-6">
        {/* User Profile */}
        <motion.div
          className="p-4 rounded-2xl shadow-lg bg-white text-black border border-gray-400 "
          variants={itemVariants}
          layout
          whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
        >
          <h2 className="text-lg font-semibold flex items-center mb-4 border-b border-gray-400">
            <User className="mr-2" />Profile
          </h2>
          <div className="flex items-center space-x-4 mb-4">
            <img
              src={companylogo}
              alt="Profile"
              className="w-16 h-16 rounded-full border border-gray-300 object-cover"
            />
            <button
              onClick={() => alert("Upload functionality coming soon!")}
              className="text-blue-500 hover:underline text-sm"
            >
              Change Profile Picture
            </button>
          </div>
          <p>Name: {userProfile.name}</p>
          <p>Role: {userProfile.employeeRole}</p>
          <p>Contact: {userProfile.contact}</p>
          <p>Department: {userProfile.department || 'N/A'}</p>
          <p>Status: {userProfile.status || 'Active'}</p>
        </motion.div>


        <motion.div
          className="p-4 rounded-2xl shadow-lg bg-white text-black col-span-1 lg:col-span-2 border border-gray-400"
          variants={itemVariants}
          layout
          whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
        >
          <h2 className="text-lg font-semibold mb-4 border-b border-gray-400">Current Projects</h2>
          <div className="space-y-4">
            {currentProjects.map((project, index) => (
              <div key={index} className="p-4 rounded-lg bg-white text-black space-y-2 border-b border-gray-400">
                <div className="flex justify-between items-center border-b border-gray-400">
                  <h3 className="text-md font-semibold border-b border-gray-400">{project.name}</h3>
                  {project.inProgress && (
                    <span className="bg-yellow-400 text-yellow-900 text-xs px-2 py-1 rounded-full border-b border-gray-400">
                      In Progress
                    </span>
                  )}
                </div>
                <p className="text-sm">
                  <span className="font-semibold">Manager:</span> {project.manager}
                </p>
                <div className="flex items-center space-x-2">
                  <span className="font-semibold text-sm">Team:</span>
                  <div className="flex -space-x-2">
                    {project.team.map((member, idx) => (
                      <div key={idx} className="w-6 h-6 rounded-full bg-blue-500 text-center text-xs">
                        {member.charAt(0)}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <span className="text-sm">Timeline: {project.timeline}</span>
                </div>
                <p className="text-sm mt-2">{project.description.substring(0, 50)}...</p>
                <button
                  onClick={() => alert(`Full view of ${project.name} project`)}
                  className="text-blue-400 text-xs hover:underline flex items-center space-x-1"
                >
                  <Eye className="w-4 h-4" />
                  <span>Full View</span>
                </button>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className=" rounded-2xl  bg-white text-black border border-gray-400"
          variants={itemVariants}
          layout
          whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
        >
          
          <DashboardCalendar />
        </motion.div>
  
        {/* Leave Balance */}
        <motion.div
          className="p-4 rounded-2xl shadow-lg bg-white text-black border border-gray-400"
          variants={itemVariants}
          layout
          whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
        >
          <h2 className="text-lg font-semibold flex items-center border-b border-gray-400">
            <Briefcase className="mr-2" />Leave Balance
          </h2>
          <p>You have {leaveBalance} leaves remaining.</p>
          <p>You have used 5 out of your 15 leaves this year.</p>
        </motion.div>
  
        {/* Recent Activities */}
        <motion.div
          className="p-4 rounded-2xl shadow-lg bg-white text-black border border-gray-400"
          variants={itemVariants}
          layout
          whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
        >
          <h2 className="text-lg font-semibold flex items-center border-b border-gray-400">
            <FileText className="mr-2" />Recent Activities
          </h2>
          <ul>
            {recentActivities.map((activity, index) => (
              <li key={index} className="text-sm">
                {activity} <button className="text-blue-400">View Details</button>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Dashboard Calendar */}
        
      </div>

      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mb-6">
        {/* Announcements */}
        <motion.div
          className="p-4 rounded-2xl shadow-lg bg-white text-black border border-gray-400"
          variants={itemVariants}
          layout
          whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
        >
          <h2 className="text-lg font-semibold flex items-center border-b border-gray-400">
            <Bell className="mr-2" />Announcements
          </h2>
          <ul>
            {announcements.map((announcement, index) => (
              <li key={index} className="text-sm">{announcement}</li>
            ))}
          </ul>
        </motion.div>

        {/* Upcoming Birthdays */}
        <motion.div
          className="p-4 rounded-2xl shadow-lg bg-white text-black border border-gray-400"
          variants={itemVariants}
          layout
          whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
        >
          <h2 className="text-lg font-semibold flex items-center border-b border-gray-400">
            <Users className="mr-2" />Upcoming Birthdays
          </h2>
          <ul>
            {birthdays.map((birthday, index) => (
              <li key={index} className="text-sm">{birthday.name} - {birthday.date}</li>
            ))}
          </ul>
        </motion.div>
        
      </div>
    </motion.div>
  );
      

  const openDialog = (title, children) => {
    setDialogContent({ title, children });
    setDialogOpen(true);
  };

  const closeDialog = () => {
    setDialogOpen(false);
    setDialogContent({ title: '', children: null });
  };

  return (
    <div className="flex min-h-screen bg-brand text-white font-sans ">
      
      
      <Sidebar toggleDarkMode={toggleDarkMode} onNavigate={handleNavigate} selectedPage={selectedPage} />
      
      <main className="flex-grow">
        
        
        <div className="p-4">
        <Header />
             
          {renderContent()}
        </div>
      </main>
      <Dialog
        isOpen={isDialogOpen}
        onClose={closeDialog}
        title={dialogContent.title}
        content={dialogContent.children}
      />
    </div>
  );
};

export default Dashboard;
