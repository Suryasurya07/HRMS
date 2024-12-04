import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement } from 'chart.js';
import { Button, IconButton, TextField } from '@mui/material';
import * as XLSX from 'xlsx';
import DataTable from 'mui-datatables';
import { ArrowRightCircle } from 'lucide-react';  // Import lucide-react icon
import dayjs from 'dayjs';  // Import dayjs for date manipulation
import axios from 'axios';  // For making API requests

// Register Chart.js components
ChartJS.register(Title, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement);

const SalaryManagement = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [employeeList, setEmployeeList] = useState([]);
  const [leaveStatus, setLeaveStatus] = useState([]);
  const [salaries, setSalaries] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState('all');  // Default to 'all' for all employees
  const [error, setError] = useState('');
  const [selectedDate, setSelectedDate] = useState(dayjs().format('YYYY-MM-DD'));  // Default to today's date
  const [totalLeavesToday, setTotalLeavesToday] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [attendanceResponse, employeeResponse, leaveResponse] = await Promise.all([
          axios.get('http://localhost:5000/api/attendance'),
          axios.get('http://localhost:5000/api/employees'),
          axios.get('http://localhost:5000/api/leave-requests')
        ]);

        setAttendanceData(attendanceResponse.data);
        setEmployeeList(employeeResponse.data.employees);
        console.log('Employee List:', employeeResponse.data.employees);
        setLeaveStatus(leaveResponse.data);
      } catch (err) {
        setError('Failed to load data. Please try again.');
        console.error('Error fetching data:', err);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchSalaries = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/salaries');
        setSalaries(response.data); // Assuming the response contains the salary data
      } catch (err) {
        console.error('Error fetching salary data:', err);
      }
    };
  
    fetchSalaries();
  }, []);
  

  useEffect(() => {
    if (attendanceData.length && employeeList.length && leaveStatus.length) {
      calculateSalary();
      calculateLeavesToday();
    }
  }, [attendanceData, employeeList, leaveStatus, selectedDate]);

  const calculateSalary = () => {
    //console.log('Starting salary calculation');
    // console.log('EMPLOYEE LIST:', employeeList);
    // console.log('ATTENDANCE DATA:', attendanceData);
    // console.log('LEAVE STATUS:', leaveStatus);
  
    const newSalaries = employeeList.map((employee) => {
      //console.log('PROCESSING EMPLOYEE FULL OBJECT:', employee);
  
      // Defensive checks for employee data
      if (!employee.EMPid) {
        console.error('Missing employee ID for an employee', employee);
        return null;
      }
  
      // Ensure we have a consistent way to get fixed wages
      const fixedWages = 
        (employee.salary && employee.salary.fixedWages) || 
        employee.fixedWages || 
        employee.fixedWages || 
        50000; // Fallback default
  
      console.log(`Fixed Wages for ${employee.name}:`, fixedWages);
  
      const attendance = attendanceData.filter((att) => att.employeeId === employee.EMPid);
      //console.log(`ATTENDANCE for ${employee.name}:`, attendance);
  
      let regularHours = 0;
      let overtimeHours = 0;
  
      attendance.forEach((att) => {
        regularHours += att.hoursWorked || 0;
        overtimeHours += att.overtimeHours || 0;
      });
  
      const leave = leaveStatus.find((lv) => lv.employeeId === employee.EMPid && lv.approved);
      const leaveDays = leave ? leave.numberOfDays : 0;
  
      //console.log(`LEAVE for ${employee.name}:`, leave);
  
      const perHourRate = fixedWages / 160;
      const grossSalary = perHourRate * regularHours + overtimeHours * (perHourRate * 1.5);
      const leaveDeduction = perHourRate * leaveDays * 8;
      const totalSalary = grossSalary - leaveDeduction;
  
      const salaryData = {
        employeeId: employee.EMPid,
        name: employee.name || 'Unknown',
        department: employee.department || 'Unassigned',
        totalSalary: Number(totalSalary.toFixed(2)),
        grossSalary: Number(grossSalary.toFixed(2)),
        leaveDeduction: Number(leaveDeduction.toFixed(2)),
        hoursWorked: Number(regularHours),
        overtimeHours: Number(overtimeHours),
        leaveDays: Number(leaveDays),
      };
  
      console.log('CALCULATED SALARY DATA:', salaryData);
  
      // Store the calculated salary in the database
      updateSalary(salaryData);
  
      return salaryData;
    }).filter(salary => salary !== null);
  
    setSalaries(newSalaries);
  };
  

  const calculateLeavesToday = () => {
    const today = dayjs(selectedDate).format('YYYY-MM-DD');
    const leavesToday = leaveStatus.filter((leave) => dayjs(leave.date).isSame(today, 'day') && leave.approved).length;
    setTotalLeavesToday(leavesToday);
  };

  const handleEmployeeSelect = (event) => {
    setSelectedEmployee(event.target.value);
  };

  const handleDateChange = (event) => {
    const date = event.target.value;
    setSelectedDate(date);
  };

  const chartData = {
    labels: salaries.map((salary) => salary.name),
    datasets: [
      {
        label: 'Total Salary',
        data: salaries.map((salary) => parseFloat(salary.totalSalary)),
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };

  // Filter the selected employee's details for the data table or show all employees
  const displayedData = selectedEmployee === 'all' ? salaries : salaries.filter((salary) => salary.employeeId === selectedEmployee);

  const updateSalary = async (salaryData) => {
    try {
      // Extremely detailed logging of payload
      //console.log('Attempting to save salary data FOR EMPLOYEE:', salaryData.name);
      //console.log('FULL Payload:', JSON.stringify(salaryData, null, 2));
  
      // Log each field explicitly
      Object.entries(salaryData).forEach(([key, value]) => {
        console.log(`FIELD: ${key}, VALUE: ${value}, TYPE: ${typeof value}`);
      });
  
      // Prepare a payload that exactly matches backend expectations
      const payload = {
        employeeId: salaryData.employeeId,
        name: salaryData.name,
        department: salaryData.department,
        totalSalary: Number(salaryData.totalSalary),
        grossSalary: Number(salaryData.grossSalary),
        leaveDeduction: Number(salaryData.leaveDeduction),
        hoursWorked: Number(salaryData.hoursWorked),
        overtimeHours: Number(salaryData.overtimeHours),
        leaveDays: Number(salaryData.leaveDays)
      };
  
      //console.log('NORMALIZED Payload:', JSON.stringify(payload, null, 2));
  
      // Validate payload before sending
      const missingFields = Object.entries(payload)
        .filter(([key, value]) => value === undefined || value === null)
        .map(([key]) => key);
  
      if (missingFields.length > 0) {
        console.error('MISSING FIELDS:', missingFields);
        throw new Error(`Missing fields: ${missingFields.join(', ')}`);
      }

      console.log('Payload:', payload);
      const response = await axios.post('http://localhost:5000/api/salaries', payload, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      //console.log('Salary save successful:', response.data);
    } catch (error) {
      console.error('FULL ERROR DETAILS:', error);
      
      if (error.response) {
        console.error('Detailed Server Error:', {
          status: error.response.status,
          data: error.response.data,
          headers: error.response.headers
        });
      }
      
      // More informative error handling
      const errorMessage = error.response?.data?.message || 
                           error.message || 
                           'Unknown error occurred while saving salary';
      
      alert(`Salary Save Error: ${errorMessage}`);
    }
  };
  
  

  return (
    <div className="p-6 bg-white text-white mt-16 flex flex-col md:flex-row">
      <div className="flex-1 mb-6 md:mb-0 md:w-2/3">
        <h2 className="text-2xl font-bold mb-4">Salary Management</h2>

        {/* Total Employees */}
        <p className="mb-4">Total Employees: {employeeList.length}</p>

        {/* Total Leaves Today */}
        <p className="mb-4">Total Leaves Today: {totalLeavesToday}</p>

        {/* Date Picker */}
        <div className="mb-4">
          <label className="mr-2">Select Date:</label>
          <TextField
            type="date"
            value={selectedDate}
            onChange={handleDateChange}
            className="bg-gray-800 text-white p-2 rounded"
          />
        </div>

        {/* Select Employee Dropdown */}
        <div className="mb-4">
          <label className="mr-2">Select Employee:</label>
          <select
            className="bg-gray-800 text-white p-2 rounded"
            value={selectedEmployee}
            onChange={handleEmployeeSelect}
          >
            <option value="all">-- Show All Employees --</option>
            {employeeList.map((employee) => (
              <option key={employee.EMPid} value={employee.EMPid}>
                {employee.name}
              </option>
            ))}
          </select>
        </div>

        {/* Data Table for Selected Employee or All Employees */}
        <DataTable
          title="Employee Details"
          data={displayedData}
          columns={[
            { name: 'name', label: 'Name' },
            { name: 'department', label: 'Department' },
            { name: 'grossSalary', label: 'Gross Salary' },
            { name: 'leaveDeduction', label: 'Leave Deduction' },
            { name: 'totalSalary', label: 'Total Salary' },
            { name: 'hoursWorked', label: 'Hours Worked' },
            { name: 'overtimeHours', label: 'Overtime Hours' },
            { name: 'leaveDays', label: 'Leave Days Taken' },
          ]}
          options={{
            selectableRows: 'none',
            filterType: 'checkbox',
          }}
        />
      </div>

      {/* Chart - Salary Visualization */}
      <div className="md:w-1/3 ml-4">
        <h3 className="text-xl font-semibold mb-4">Salary Overview</h3>
        <div className="mb-6">
          <Line data={chartData} height={250} width={350} />
        </div>
        <IconButton color="primary" size="large">
          <ArrowRightCircle />
        </IconButton>
      </div>
    </div>
  );
};

export default SalaryManagement;
