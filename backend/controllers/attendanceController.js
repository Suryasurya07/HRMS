// controllers/attendanceController.js

import Attendance from '../models/attendance.js';

export const addAttendance = async (req, res) => {
  const { employeeId, name, attendanceStatus , clockIn,clockOut,hoursWorked,overtimeHours} = req.body;

  try {
    const newAttendance = new Attendance({ employeeId, name, attendanceStatus , clockIn,clockOut,hoursWorked,overtimeHours });
    await newAttendance.save();
    res.status(201).json(newAttendance);
  } catch (err) {
    console.error('Error adding attendance:', err);
    res.status(500).send('Server error');
  }
};

export const getAttendance = async (req, res) => {
  try {
    const attendance = await Attendance.find()
    res.status(200).json(attendance);
  } catch (err) {
    console.error('Error fetching attendance:', err);
    res.status(500).send('Server error');
  }
};
