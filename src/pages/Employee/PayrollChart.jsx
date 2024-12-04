import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend, ArcElement);

// Sample payroll data for the charts
const dataSalary = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Salary',
      data: [4000, 4500, 4700, 5200, 5000, 5300],
      backgroundColor: 'rgba(130, 202, 157, 0.5)',
      borderColor: '#82ca9d',
      borderWidth: 1,
    },
  ],
};

const dataGender = {
  labels: ['Male', 'Female', 'Other'],
  datasets: [
    {
      label: 'Employee Gender Distribution',
      data: [50, 45, 5],
      backgroundColor: ['rgba(130, 202, 157, 0.5)', 'rgba(255, 99, 132, 0.5)', 'rgba(54, 162, 235, 0.5)'],
      borderColor: ['#82ca9d', '#ff6384', '#36a2eb'],
      borderWidth: 1,
    },
  ],
};

const dataDeptSalary = {
  labels: ['HR', 'Engineering', 'Sales', 'Finance', 'Marketing'],
  datasets: [
    {
      label: 'Avg Gross Salary by Department',
      data: [4500, 6000, 4800, 5500, 4900],
      backgroundColor: 'rgba(130, 202, 157, 0.5)',
      borderColor: '#82ca9d',
      borderWidth: 1,
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
      labels: {
        color: 'white',  // Set legend text color to white
      },
    },
    tooltip: {
      enabled: true,
    },
  },
  scales: {
    x: {
      beginAtZero: true,
      ticks: { color: 'white' },  // Set x-axis tick color to white
    },
    y: {
      beginAtZero: true,
      ticks: { color: 'white' },  // Set y-axis tick color to white
    },
  },
};

const PayrollDashboard = () => {
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState('Jan');
  const [selectedDepartment, setSelectedDepartment] = useState('Engineering');
  const [showSalaryBreakdown, setShowSalaryBreakdown] = useState(false);

  const handleEmployeeSelect = (e) => {
    setSelectedEmployee(e.target.value);
  };

  const handleMonthSelect = (e) => {
    setSelectedMonth(e.target.value);
  };

  const handleDepartmentSelect = (e) => {
    setSelectedDepartment(e.target.value);
  };

  const toggleSalaryBreakdown = () => {
    setShowSalaryBreakdown(!showSalaryBreakdown);
  };

  return (
    <motion.div
      className="w-full h-screen p-6 bg-gray-900 mt-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7 }}
    >
      <h2 className="text-center text-2xl font-bold text-white mb-6">Payroll Dashboard</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {/* Total Employees */}
        <motion.div
          className="bg-gray-700 rounded-xl p-4 shadow-lg"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-lg font-semibold text-white mb-3">Total Employees</h3>
          <div className="text-3xl font-bold text-center text-gray-300">120</div>
        </motion.div>

        {/* Select Employee */}
        <motion.div
          className="bg-gray-700 rounded-xl p-4 shadow-lg"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-lg font-semibold text-white mb-3">Select Employee</h3>
          <select
            className="w-full p-3 border rounded-lg bg-gray-800 text-white"
            onChange={handleEmployeeSelect}
            value={selectedEmployee}
          >
            <option value="">Select an Employee</option>
            <option value="John Doe">John Doe</option>
            <option value="Jane Smith">Jane Smith</option>
            <option value="Alice Johnson">Alice Johnson</option>
          </select>
        </motion.div>

        {/* Select Month */}
        <motion.div
          className="bg-gray-700 rounded-xl p-4 shadow-lg"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-lg font-semibold text-white mb-3">Select Month</h3>
          <select
            className="w-full p-3 border rounded-lg bg-gray-800 text-white"
            onChange={handleMonthSelect}
            value={selectedMonth}
          >
            {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'].map((month) => (
              <option key={month} value={month}>
                {month}
              </option>
            ))}
          </select>
        </motion.div>

        {/* Select Department */}
        <motion.div
          className="bg-gray-700 rounded-xl p-4 shadow-lg"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-lg font-semibold text-white mb-3">Select Department</h3>
          <select
            className="w-full p-3 border rounded-lg bg-gray-800 text-white"
            onChange={handleDepartmentSelect}
            value={selectedDepartment}
          >
            <option value="Engineering">Engineering</option>
            <option value="HR">HR</option>
            <option value="Sales">Sales</option>
            <option value="Finance">Finance</option>
            <option value="Marketing">Marketing</option>
          </select>
        </motion.div>

        {/* Payroll Overview (Salary by Month) */}
        <motion.div
          className="bg-gray-700 rounded-xl p-4 shadow-lg col-span-2 md:col-span-3 lg:col-span-2"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-lg font-semibold text-white mb-3">Payroll Overview</h3>
          <Bar data={dataSalary} options={options} />
        </motion.div>

        {/* Employee Gender Distribution */}
        <motion.div
          className="bg-gray-700 rounded-xl p-4 shadow-lg"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-lg font-semibold text-white mb-3">Employee Gender Distribution</h3>
          <Pie data={dataGender} options={options} />
        </motion.div>

        {/* Average Salary by Department */}
        <motion.div
          className="bg-gray-700 rounded-xl p-4 shadow-lg"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-lg font-semibold text-white mb-3">Avg Gross Salary by Department</h3>
          <Bar data={dataDeptSalary} options={options} />
        </motion.div>
      </div>

      {/* Detailed Salary Breakdown */}
      <div className="mt-6">
        <button
          className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-green-600"
          onClick={toggleSalaryBreakdown}
        >
          {showSalaryBreakdown ? 'Hide Salary Breakdown' : 'Show Salary Breakdown'}
        </button>
        {showSalaryBreakdown && (
          <div className="bg-gray-700 p-6 rounded-xl mt-4">
            <h3 className="text-lg font-semibold text-white mb-4">Salary Breakdown</h3>
            <ul className="text-white">
              <li>Basic Salary: $5000</li>
              <li>Bonus: $500</li>
              <li>Deductions: $200</li>
              <li>Net Salary: $5300</li>
            </ul>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default PayrollDashboard;
