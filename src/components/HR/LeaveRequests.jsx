import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';

const LeaveRequests = () => {
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch leave requests from the server
  const fetchLeaveRequests = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('http://localhost:5000/api/leave-requests');
      
      if (!response.ok) {
        throw new Error('Failed to fetch leave requests');
      }

      const data = await response.json();
      setLeaveRequests(data);
    } catch (error) {
      setError('Error fetching leave requests');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Approve leave request
  const handleApprove = async (employeeId, leaveStartDate) => {
    if (!employeeId || !leaveStartDate) {
      console.error("Employee ID or Leave Start Date is undefined");
      return;
    }
  
    try {
      const response = await fetch(`http://localhost:5000/api/leave-requests/${employeeId}-${leaveStartDate}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ approved: true }), // Set approved to true
      });
  
      if (!response.ok) {
        throw new Error(`Failed to update leave request: ${response.status} ${response.statusText}`);
      }
  
      const updatedRequest = await response.json();
      setLeaveRequests((prevRequests) =>
        prevRequests.map((request) =>
          request.employeeId === updatedRequest.employeeId && request.leaveStartDate === updatedRequest.leaveStartDate
            ? { ...request, approved: true }
            : request
        )
      );
    } catch (error) {
      console.error('Error approving leave request:', error.message);
    }
  };

  useEffect(() => {
    fetchLeaveRequests();
  }, []);

  const columns = [
    { field: 'employeeId', headerName: 'Employee ID', width: 150 },
    { field: 'leaveType', headerName: 'Leave Type', width: 150 },
    { field: 'numberOfDays', headerName: 'Number of Days', width: 180 },
    { field: 'leaveDates', headerName: 'Date', width: 250, renderCell: (params) => `${params.row.leaveStartDate} - ${params.row.leaveEndDate}` },
    { field: 'reason', headerName: 'Reason', width: 250 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 180,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="success"
          onClick={() => handleApprove(params.row.employeeId, params.row.leaveStartDate)}
          disabled={params.row.approved} // Disable the button if already approved
        >
          {params.row.approved ? 'Approved' : 'Approve'}
        </Button>
      )
    },
    {
      field: 'approved',
      headerName: 'Approval Status',
      width: 180,
      renderCell: (params) => (
        params.row.approved ? <span className="text-green-500 font-semibold">Approved</span> : <span className="text-red-500 font-semibold">Pending</span>
      ),
    },
  ];

  const rows = leaveRequests.map((request, index) => ({
    id: `${request.employeeId}-${request.leaveStartDate}-${index}`, // Ensure unique ID
    employeeId: request.employeeId,
    leaveType: request.leaveType,
    numberOfDays: request.numberOfDays,
    leaveStartDate: request.leaveStartDate,
    leaveEndDate: request.leaveEndDate,
    reason: request.reason,
    approved: request.approved, // Use approved instead of status
  }));

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Leave Requests</h2>
      
      {loading ? (
        <p>Loading leave requests...</p>
      ) : error ? (
        <div>
          <p className="text-red-500">{error}</p>
          <button
            onClick={fetchLeaveRequests}
            className="mt-2 bg-blue-500 text-white py-1 px-3 rounded"
          >
            Retry
          </button>
        </div>
      ) : leaveRequests.length === 0 ? (
        <p>No leave requests available.</p>
      ) : (
        <div style={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={5}
            disableSelectionOnClick
            sx={{
              '& .MuiDataGrid-root': {
                backgroundColor: 'white',
              },
              '& .MuiDataGrid-columnHeader': {
                backgroundColor: '#f5f5f5',
              },
              '& .MuiDataGrid-cell': {
                backgroundColor: 'white',
              },
            }}
          />
        </div>
      )}
    </div>
  );
};

export default LeaveRequests;
