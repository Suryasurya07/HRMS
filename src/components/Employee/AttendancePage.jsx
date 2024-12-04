// src/components/Employee/AttendancePage.jsx
import React from 'react';
import AttendanceChart from './AttendanceChart'; // Adjust path if necessary

const AttendancePage = ({ attendanceData }) => {
    return (
        <div className="p-6 bg-gradient-to-r from-purple-500 to-black rounded-lg shadow-md">
            <h1 className="text-3xl font-bold mb-6 text-white">Attendance Records</h1>

            {/* Attendance Records Chart */}
            <div className="mt-6">
                <AttendanceChart attendanceData={attendanceData} />
            </div>

            {/* Attendance Records Table */}
            <div className="mt-6">
                <h2 className="text-xl font-semibold text-white">Attendance Records</h2>
                <table className="min-w-full bg-white mt-4 rounded-lg shadow-md">
                    <thead>
                        <tr>
                            <th className="py-2">Employee ID</th>
                            <th className="py-2">Employee Name</th>
                            <th className="py-2">Status</th>
                            <th className="py-2">Date</th>
                            <th className="py-2">Department</th>
                        </tr>
                    </thead>
                    <tbody>
                        {attendanceData.map(record => (
                            <tr key={record.employeeId} className="hover:bg-gray-100">
                                <td className="py-2 text-center">{record.employeeId}</td>
                                <td className="py-2 text-center">{record.employee}</td>
                                <td className="py-2 text-center">{record.status}</td>
                                <td className="py-2 text-center">{record.date}</td>
                                <td className="py-2 text-center">{record.department}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AttendancePage;
