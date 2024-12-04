import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import axios from 'axios';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Backdrop } from '@mui/material';

const buttonVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.05, boxShadow: "0 0 10px rgba(255, 255, 255, 0.5)" },
    tap: { scale: 0.95 },
};

const WORKPLACE_COORDINATES = { lat: 11.1673344, lng: 77.6863744 };
const RADIUS = 100; // Radius in meters

const ClockInOut = ({ employee }) => {
    const [isClockedIn, setIsClockedIn] = useState(false);
    const [loading, setLoading] = useState(false);
    const [attendanceRecord, setAttendanceRecord] = useState(null);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [dialogMessage, setDialogMessage] = useState('');
    const [elapsedTime, setElapsedTime] = useState(0); // Track elapsed time
    const [timerInterval, setTimerInterval] = useState(null); // Track the interval for the timer

    const calculateTimeDifferences = (clockIn, clockOut) => {
        const msDifference = new Date(clockOut) - new Date(clockIn);
        const hoursWorked = Math.floor(msDifference / (1000 * 60 * 60));
        const overtimeHours = hoursWorked > 9 ? hoursWorked - 9 : 0;
        return { hoursWorked, overtimeHours };
    };

    useEffect(() => {
        if (employee && employee.EMPid) {
            const storedData = JSON.parse(localStorage.getItem('attendanceData')) || [];
            const employeeData = storedData.find(data => data.employeeId === employee.EMPid);
            const hasClockedIn = employeeData ? employeeData.attendanceStatus === 'present' : false;
            setIsClockedIn(hasClockedIn);
            setAttendanceRecord(employeeData || null);
        }
    }, [employee]);

    useEffect(() => {
        if (isClockedIn && !timerInterval) {
            // Start the timer when clocked in
            const interval = setInterval(() => {
                setElapsedTime(prev => prev + 1); // Increment elapsed time every second
            }, 1000);
            setTimerInterval(interval);
        } else if (!isClockedIn && timerInterval) {
            // Stop the timer when clocked out
            clearInterval(timerInterval);
            setTimerInterval(null);
            setElapsedTime(0); // Reset elapsed time when clocking out
        }
        return () => clearInterval(timerInterval); // Cleanup on component unmount
    }, [isClockedIn, timerInterval]);

    const calculateDistance = (lat1, lon1, lat2, lon2) => {
        const R = 6371e3;
        const φ1 = (lat1 * Math.PI) / 180;
        const φ2 = (lat2 * Math.PI) / 180;
        const Δφ = ((lat2 - lat1) * Math.PI) / 180;
        const Δλ = ((lon2 - lon1) * Math.PI) / 180;

        const a =
            Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
        return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    };

        const isWithinClockInTime = () => {
            const now = new Date();
            const currentHour = now.getHours();
            const currentMinute = now.getMinutes();
        
            // Clock-in should only be between 12:00 AM (00:00) and 9:40 AM (09:40)
            return (currentHour === 0 && currentMinute >= 0) || (currentHour > 0 && currentHour < 20) || (currentHour === 20 && currentMinute <= 40);
        };
        
        const isWithinClockOutTime = () => {
            const now = new Date();
            const currentHour = now.getHours();
            const currentMinute = now.getMinutes();
        
            // Clock-out should only be between 6:30 PM (18:30) and 12:00 AM (00:00)
            return (currentHour === 17 && currentMinute >= 30) || (currentHour > 17 && currentHour < 24);
        };
    

    const handleToggleClock = async () => {
        if (!employee || !employee.EMPid) {
            setDialogMessage('Employee data is not available. Please check your employee information.');
            setDialogOpen(true);
            return;
        }

        setLoading(true);

        try {
            const response = await axios.get('http://localhost:5000/api/employees');
            const employeesList = response.data.employees;

            const employeeExists = employeesList.some(emp => emp.EMPid === employee.EMPid && emp.status === 'Active');
            if (!employeeExists) {
                setDialogMessage('Employee not found in the employee list or is inactive.');
                setDialogOpen(true);
                setLoading(false);
                return;
            }

            navigator.geolocation.getCurrentPosition(async (position) => {
                const { latitude, longitude } = position.coords;

                console.log('Current Login Attempt Coordinates:', {
                    latitude,
                    longitude,
                });

                const distance = calculateDistance(latitude, longitude, WORKPLACE_COORDINATES.lat, WORKPLACE_COORDINATES.lng);
                if (distance > RADIUS) {
                    setDialogMessage(`You are too far from the workplace to clock in. Please be within ${RADIUS} meters.`);
                    setDialogOpen(true);
                    setLoading(false);
                    return;
                }

                const currentTimestamp = new Date().toISOString();

                let updatedAttendanceRecord;
                if (isClockedIn) {
                    if (!isWithinClockOutTime()) {
                        setDialogMessage('You can only clock out between 6:30 PM and 12:00 AM.');
                        setDialogOpen(true);
                        setLoading(false);
                        return;
                    }

                    const { hoursWorked, overtimeHours } = calculateTimeDifferences(attendanceRecord.clockIn, currentTimestamp);
                    updatedAttendanceRecord = {
                        employeeId: employee.EMPid,
                        name: employee.name,
                        attendanceStatus: 'leave',
                        clockIn: attendanceRecord.clockIn,
                        clockOut: currentTimestamp,
                        hoursWorked,
                        overtimeHours,
                    };
                    setDialogMessage(`Successfully clocked out. Hours Worked: ${hoursWorked}, Overtime: ${overtimeHours}`);
                } else {
                    if (!isWithinClockInTime()) {
                        setDialogMessage('You can only clock in between 12:00 AM and 9:40 AM.');
                        setDialogOpen(true);
                        setLoading(false);
                        return;
                    }

                    updatedAttendanceRecord = {
                        employeeId: employee.EMPid,
                        name: employee.name,
                        attendanceStatus: 'present',
                        clockIn: currentTimestamp,
                        clockOut: null,
                        hoursWorked: 0,
                        overtimeHours: 0,
                    };
                    setDialogMessage('Successfully clocked in.');
                }

                await axios.post('http://localhost:5000/api/attendance', updatedAttendanceRecord);

                const attendanceRecords = JSON.parse(localStorage.getItem('attendanceData')) || [];
                const updatedRecords = attendanceRecords.filter(record => record.employeeId !== employee.EMPid);
                updatedRecords.push(updatedAttendanceRecord);
                localStorage.setItem('attendanceData', JSON.stringify(updatedRecords));

                setIsClockedIn(!isClockedIn);
                setDialogOpen(true);
                setLoading(false);
            }, (error) => {
                setDialogMessage('Unable to retrieve your location. Please enable location services.');
                setDialogOpen(true);
                setLoading(false);
            });
        } catch (error) {
            console.error('Error handling attendance data:', error);
            setDialogMessage('Error handling attendance data. Please try again later.');
            setDialogOpen(true);
            setLoading(false);
        }
    };

    // Format elapsed time in HH:MM:SS format
    const formatElapsedTime = (seconds) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const sec = seconds % 60;
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
    };

    return (
        <div className="flex items-center">
            <div className="mr-4">
                {isClockedIn && (
                    <span className="text-sm text-white">Worked Hours: {formatElapsedTime(elapsedTime)}</span>
                )}
            </div>
            <motion.button
                onClick={handleToggleClock}
                className="bg-white text-gray-900 py-2 px-4 rounded-lg shadow-md"
                disabled={loading}
                variants={buttonVariants}
                initial="initial"
                whileHover="hover"
                whileTap="tap"
            >
                {isClockedIn ? 'Clock Out' : 'Clock In'}
            </motion.button>
            <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} BackdropComponent={Backdrop} BackdropProps={{ timeout: 500 }}>
                <DialogTitle>Attendance Status</DialogTitle>
                <DialogContent>{dialogMessage}</DialogContent>
                <DialogActions>
                    <Button onClick={() => setDialogOpen(false)} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

ClockInOut.propTypes = {
    employee: PropTypes.shape({
        EMPid: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
    }).isRequired,
};

export default ClockInOut;
