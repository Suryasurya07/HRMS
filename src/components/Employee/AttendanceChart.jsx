// src/components/Employee/AttendanceChart.jsx
import React from 'react';
import { Bar } from 'react-chartjs-2';

const AttendanceChart = ({ attendanceData }) => {
    // Prepare the data for the chart
    const labels = attendanceData.map(record => record.employee);
    const presentCounts = attendanceData.map(record => record.status === 'Present' ? 1 : 0);
    const leaveCounts = attendanceData.map(record => record.status === 'Leave' ? 1 : 0);

    const data = {
        labels,
        datasets: [
            {
                label: 'Present',
                data: presentCounts,
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
            },
            {
                label: 'Leave',
                data: leaveCounts,
                backgroundColor: 'rgba(255, 99, 132, 0.6)',
            },
        ],
    };

    return (
        <div>
            <h2 className="text-xl font-semibold">Attendance Overview</h2>
            <div className="chart-container" style={{ position: 'relative', width: '80%', height: '300px' }}>
                <Bar data={data} options={{ responsive: true }} />
            </div>
        </div>
    );
};

export default AttendanceChart;
