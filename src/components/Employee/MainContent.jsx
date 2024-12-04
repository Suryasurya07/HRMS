// MainContent.jsx
import React, { useEffect } from 'react';
import useEmployeeStore from '../store/useEmployeeStore';
import employeesData from '../data/employees.json';

const MainContent = () => {
  const { setEmployees } = useEmployeeStore();

  // Set employees data from JSON file
  useEffect(() => {
    setEmployees(employeesData); // Loading JSON data into Zustand store
  }, [setEmployees]);

  return (
    <div className="p-6 w-full h-full bg-gray-100 overflow-hidden">
      
    </div>
  );
};

export default MainContent;
