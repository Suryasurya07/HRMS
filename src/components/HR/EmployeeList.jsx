import React, { useEffect, useState } from 'react';
import MUIDataTable from 'mui-datatables';
import { CheckCircle, Phone, Users, Briefcase, IdCard } from 'lucide-react';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/employees');
        if (!response.ok) throw new Error('Failed to fetch employees.');
        const data = await response.json();
        setEmployees(data.employees); 
        console.log(employees);// Adjusted to access the employees array
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  const handleRowClick = (rowData, rowMeta) => {
    const employee = employees[rowMeta.dataIndex];
    setSelectedEmployee(employee);
  };

        const columns = [
          {
            name: "EMPid",
            label: "ID",
            options: {
              filter: true,
              sort: true,
              customHeadRender: (columnMeta) => (
                <th key={columnMeta.name}>
                  <IdCard size={16} className="inline-block mr-1 text-black" />
                  {columnMeta.label}
                </th>
              ),
            }
          },
          {
            name: "name",
            label: "Name",
            options: {
              filter: true,
              sort: true,
              customHeadRender: (columnMeta) => (
                <th key={columnMeta.name}>
                  <Users size={16} className="inline-block mr-1 text-black" />
                  {columnMeta.label}
                </th>
              ),
            }
          },
          {
            name: "department",
            label: "Department",
            options: {
              filter: true,
              sort: true,
              customHeadRender: (columnMeta) => (
                <th key={columnMeta.name}>
                  <Briefcase size={16} className="inline-block mr-1 text-black" />
                  {columnMeta.label}
                </th>
              ),
            }
          },
          {
            name: "contact",
            label: "Contact",
            options: {
              filter: true,
              sort: true,
              customHeadRender: (columnMeta) => (
                <th key={columnMeta.name}>
                  <Phone size={16} className="inline-block mr-1 text-black" />
                  {columnMeta.label}
                </th>
              ),
            }
          },
          {
            name: "status",
            label: "Status",
            options: {
              filter: true,
              sort: true,
              customHeadRender: (columnMeta) => (
                <th key={columnMeta.name}>
                  <CheckCircle size={16} className="inline-block mr-1 text-black" />
                  {columnMeta.label}
                </th>
              ),
            }
          }
        ];
  

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-center text-red-500">Error: {error}</div>;
  if (employees.length === 0) return <div className="text-center">No employees found.</div>;

  return (
    <div className="flex flex-col lg:flex-row">
      <div className="lg:w-2/3 p-4">
        <h2 className="text-lg font-semibold mb-2 text-white">Employee List</h2>
        
        <MUIDataTable
          title={"Employee List"}
          data={employees}
          columns={columns}
          options={{
            filterType: 'checkbox',
            selectableRows: 'none',
            onRowClick: handleRowClick,
            rowsPerPage: 10,
            pagination: true,
            search: true,
          }}
        />
      </div>

      <div className="lg:w-1/3 p-4 border-l border-gray-300">
        {selectedEmployee ? (
          <div>
            <h3 className="text-lg font-semibold mb-2 text-white">Employee Details</h3>
            <p className="text-white"><strong>ID:</strong> {selectedEmployee.EMPid}</p>
            <p className="text-white"><strong>Name:</strong> {selectedEmployee.name}</p>
            <p className="text-white"><strong>Department:</strong> {selectedEmployee.department}</p>
            <p className="text-white"><strong>Contact:</strong> {selectedEmployee.contact}</p>
            <p className="text-white"><strong>Status:</strong> {selectedEmployee.status}</p>
            <p className="text-white"><strong>Role:</strong> {selectedEmployee.employeeRole}</p>
            <p className="text-white"><strong>Email:</strong> {selectedEmployee.employeeEmail}</p>
            <p className="text-white"><strong>DOB:</strong> {selectedEmployee.employeeDob}</p>
            <p className="text-white"><strong>Address:</strong> {selectedEmployee.employeeAddress}</p>
            <p className="text-white"><strong>Emergency Contact:</strong> {selectedEmployee.employeeEmergencyContact}</p>
            <p className="text-white"><strong>Qualifications:</strong> {selectedEmployee.employeeQualifications}</p>
            <p className="text-white"><strong>Experience:</strong> {selectedEmployee.employeeExperience}</p>
            <p className="text-white"><strong>Team Lead:</strong> {selectedEmployee.teamLead}</p> {/* Add Team Lead */}
            <p className="text-white"><strong>HR:</strong> {selectedEmployee.hr}</p> {/* Add HR */}
            
          </div>
        ) : (
          <p className="text-white">Select an employee to see details.</p>
        )}
      </div>
    </div>
  );
};

export default EmployeeList;
