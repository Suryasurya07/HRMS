import React, { useEffect, useState } from 'react';
import MUIDataTable from 'mui-datatables';

const AttendanceDashboard = () => {
    const [attendanceRecords, setAttendanceRecords] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAttendanceData = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/attendance'); 
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                console.log('Fetched Data:', data);
                setAttendanceRecords(Array.isArray(data) ? data : []);
            } catch (err) {
                setError('Failed to fetch attendance records. Please check if the data is available.');
            } finally {
                setLoading(false);
            }
        };

        fetchAttendanceData();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="loader">Loading...</div> {/* Replace this with a spinner or loading animation */}
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-red-500 text-center">
                {error}
                <button onClick={() => setLoading(true)} className="mt-2 bg-blue-500 text-white px-4 py-2 rounded">
                    Retry
                </button>
            </div>
        );
    }

    // Check if attendanceRecords is empty
    if (attendanceRecords.length === 0) {
        return (
            <div className="text-center">
                <h2 className="text-xl font-semibold mb-4">No Attendance Records Available</h2>
            </div>
        );
    }

    const columns = [
        { name: "employeeId", label: "Employee ID", options: { filter: true, sort: true } },
        { name: "name", label: "Name", options: { filter: true, sort: true } },
        { name: "status", label: "Status", options: { filter: true, sort: true } },
        { name: "clockIn", label: "Clock In Time", options: { filter: false, sort: true, customBodyRender: (value) => new Date(value).toLocaleString() } },
        { name: "clockOut", label: "Clock Out Time", options: { filter: false, sort: true, customBodyRender: (value) => value ? new Date(value).toLocaleString() : 'Not yet' } },
    ];

    const options = {
        filterType: 'checkbox',
        responsive: 'vertical', // or 'scroll', depending on your layout preference
        pagination: true,
        elevation: 1,
    };

    return (
        <div className="p-6 bg-gray-800 min-h-screen">
            <h2 className="text-xl font-semibold mb-4 text-white">Attendance Records</h2>
            <MUIDataTable
                title={"Attendance Records"}
                data={attendanceRecords}
                columns={columns}
                options={options}
            />
        </div>
    );
};

export default AttendanceDashboard;
