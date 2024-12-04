import { createContext, useState, useContext } from 'react';

// Create context
const LoggedInEmployeeContext = createContext();

// Custom hook to use the context
export const useLoggedInEmployee = () => {
  return useContext(LoggedInEmployeeContext);
};

// Fetch employee data function (replace this with your actual API call)
const fetchEmployeeData = async () => {
  try {
    const response = await fetch('/backend/employeeslist.json'); // Replace with your actual API URL
    if (!response.ok) {
      throw new Error('Failed to fetch employee data');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching employee data:', error);
    return null; // or handle error accordingly
  }
};

// LoggedInEmployeeProvider component
export const LoggedInEmployeeProvider = ({ children }) => {
  const [loggedInEmployee, setLoggedInEmployee] = useState(null);

  // Fetch or set logged-in employee data
  const fetchLoggedInEmployee = async () => {
    const employeeData = await fetchEmployeeData();
    setLoggedInEmployee(employeeData);
  };

  return (
    <LoggedInEmployeeContext.Provider value={{ loggedInEmployee, fetchLoggedInEmployee }}>
      {children}
    </LoggedInEmployeeContext.Provider>
  );
};
