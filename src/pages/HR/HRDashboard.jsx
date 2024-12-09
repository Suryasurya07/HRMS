import React, { useState, useCallback, useMemo ,useEffect } from 'react';
import { motion } from 'framer-motion';
import { Bar } from 'react-chartjs-2';
import { Users, BarChart } from 'lucide-react';
import axios from 'axios';
import Sidebar from '../../components/HR/Sidebar';
import Header from '../../components/HR/Header';
import 'react-calendar/dist/Calendar.css';
import useHRStore from '../../store/useHRStore.js';
import AddEmployeeForm from '../../components/HR/AddEmployeeForm';
import EmployeeList from '../../components/HR/EmployeeList';
import Attendance from '../../components/HR/AttendanceDashboard';
import MapRadiusSetter from '../../components/HR/MapRadiusSetter';
import LeaveRequests from '../../components/HR/LeaveRequests';
import employeesList from '../../../backend/employeeslist.json';
import DashboardCalendar from '../../pages/Employee/DashboardCalendar';
import PayrollChart from '../../pages/Employee/PayrollChart';
import Projects from '../../components/HR/Projects.jsx';
import SalaryManagement from '../../components/HR/SalaryManagement.jsx';



const HRDashboard = () => {
  const [selectedPage, setSelectedPage] = useState('dashboard');
  const [date, setDate] = useState(new Date());
  const { employees, tasks, addEmployee, toggleTask, attendance } = useHRStore();
  const [username, setUsername] = useState('');

 
  useEffect(() => {
    // Get the token and username from localStorage
    const token = localStorage.getItem('token');
    const storedUsername = localStorage.getItem('username');
  
    if (storedUsername) {
      setUsername(storedUsername); // Set the username from localStorage
    } else {
      setUsername('Employee Not Found');
    }
  }, []);
  
  

  // Sort and get the top 5 employees by experience
  const topEmployees = useMemo(() => {
    const employeesData = employeesList.employees || []; // Access array if it's inside an object
    if (Array.isArray(employeesData)) {
      const sortedEmployees = [...employeesData].sort((a, b) => b.experience - a.experience);
      return sortedEmployees.slice(0, 5);
    }
    return [];
  }, [employeesList]);

  // Memoize salary data to avoid recalculating on each render
  const salaryData = useMemo(
    () => ({
      labels: ['Design', 'Development', 'Marketing'],
      datasets: [
        {
          label: 'Salary Statistics',
          data: [3000, 4000, 2500],
          backgroundColor: ['rgba(75,192,192,1)', 'rgba(255,206,86,1)', 'rgba(255,99,132,1)'],
        },
      ],
    }),
    []
  );

  const recentActivityData = useMemo(() => {
    // Here, you can use dynamic data for recent activities or mock some data
    return [
      { time: '2 hours ago', activity: 'John Doe clocked in' },
      { time: '1 day ago', activity: 'Alice Smith submitted a leave request' },
      { time: '3 days ago', activity: 'Bob Brown completed a project task' },
      { time: '5 days ago', activity: 'Sara Williams added new feedback' },
      { time: '7 days ago', activity: 'Mark Johnson completed payroll' },
    ];
  }, []);

  const renderContent = useCallback(() => {
    switch (selectedPage) {
      case 'addEmployee':
        return <AddEmployeeForm onAddEmployee={addEmployee} />;
      case 'employees':
        return <EmployeeList employees={employees} />;
      case 'attendance':
        return <Attendance attendance={attendance} />;
      case 'location':
        return <MapRadiusSetter />;
      case 'leave-requests':
        return <LeaveRequests />;
      case 'payroll':
        return <SalaryManagement />;
        case 'projects':
        return <Projects />;
      default:
        return renderDashboard();
    }
  }, [selectedPage, addEmployee, employees, attendance]);

  const renderDashboard = useCallback(
    () => (
      <motion.div
        className="p-6  text-white rounded-lg shadow-lg mt-16 "
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
        }}
      >
        <h1 className="font-sans text-xl font-medium mb-4 text-gray-400">Welcome to the Dashboard, {username}</h1>

        <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6 ">
          <motion.div
            className="bg-white p-4 rounded-lg shadow transition duration-300 border border-gray-400"
            variants={{
              hidden: { opacity: 0, y: 50 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
            }}
            whileHover={{ scale: 1.05, transition: { duration: 0.3 } }} // Added smoother scaling
            style={{ transformOrigin: 'center' }} // Ensures smooth scaling from the center
          >
            <h2 className="text-lg font-semibold mb-2 border-b border-gray-400 text-gray-400">Salary Statistics</h2>
            <Bar data={salaryData} options={{ maintainAspectRatio: true }} height={200} />
          </motion.div>

          <motion.div
            className="bg-white p-4 rounded-lg shadow  transition duration-300 custom-scrollbar scrollbar-hide border border-gray-400"
            variants={{
              hidden: { opacity: 0, y: 50 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
            }}
            whileHover={{ scale: 1.05, transition: { duration: 0.3 } }} // Added smoother scaling
            style={{ transformOrigin: 'center' }} // Ensures smooth scaling from the center
          >
            <h2 className="text-lg font-semibold mb-2 border-b border-gray-400 text-gray-400">Top Employees</h2>
            <div>
              {topEmployees.map((employee, index) => (
                <div key={index}>
                  <span className="text-gray-400 font-semibold">{employee.name}</span> -{' '}
                  <span className="text-gray-400">{employee.employeeExperience} of experience</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div className='text-gray-400 border-gray-400 rounded-lg'
            style={{ transformOrigin: 'center' }} // Ensures smooth scaling from the center
          >
            <DashboardCalendar />
          </motion.div>
        </motion.div>

        <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6 ">
          <DashboardBox title="Total Employees" value={60} icon={<Users className="text-indigo-500 " />} />
          <DashboardBox title="Present Employees" value={45} icon={<Users className="text-green-500" />} />
          <DashboardBox title="Total Projects" value={15} icon={<BarChart className="text-yellow-500" />} />
        </motion.div>

        <motion.div
          className="bg-white p-4 rounded-lg shadow transition duration-300 border border-gray-400 text-gray-400"
          variants={{
            hidden: { opacity: 0, y: 50 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
          }}
          whileHover={{ scale: 1.05, transition: { duration: 0.3 } }} // Added smoother scaling
          style={{ transformOrigin: 'center' }} // Ensures smooth scaling from the center
        >
          <h2 className="text-lg font-semibold mb-2 border-b border-gray-400 text-gray-400">To-Do List</h2>
          <ul className="space-y-2 ">
            {tasks.map((task, index) => (
              <li key={`${task.task}-${index}`} className="flex items-center justify-between ">
                <span className={`flex-1 ${task.done ? 'line-through text-gray-400' : 'text-black'}`}>
                  {task.task}
                </span>
                <button onClick={() => toggleTask(index)} className="ml-4 text-indigo-500">
                  {task.done ? 'Undo' : 'Complete'}
                </button>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Recent Activity Section (placed below Top Employees) */}
        <motion.div
          className="bg-white p-4 rounded-lg shadow transition duration-300 mt-6 border border-gray-400 text-gray-400"
          variants={{
            hidden: { opacity: 0, y: 50 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
          }}
          whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
          style={{ transformOrigin: 'center' }}
        >
          <h2 className="text-lg font-semibold mb-2 border-b border-gray-400">Recent Activity</h2>
          <ul className="space-y-2">
            {recentActivityData.map((activity, index) => (
              <li key={index} className="text-sm text-gray-600">
                <span>{activity.time}</span> - <span>{activity.activity}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </motion.div>
    ),
    [date, employees, salaryData, tasks, toggleTask, username, topEmployees, recentActivityData]
  );

  const DashboardBox = useCallback(
    ({ title, value, icon }) => (
      <motion.div
        className=" p-4 rounded-lg shadow flex items-center justify-between transition duration-300"
        variants={{
          hidden: { opacity: 0, y: 50 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
        }}
        whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
        style={{ transformOrigin: 'center' }}
      >
        <div>
          <p className="text-lg font-semibold">{title}</p>
          <p className="text-xl font-bold">{value}</p>
        </div>
        <div>{icon}</div>
      </motion.div>
    ),
    []
  );

  return (
    <div className="flex min-h-screen text-white">
      <Sidebar onSelectPage={setSelectedPage} />
      <div className="flex-1 p-6 overflow-y-auto">
        <Header />
        {renderContent()}
      </div>
    </div>
  );
};

export default HRDashboard;
