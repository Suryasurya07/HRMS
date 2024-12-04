import mongoose from 'mongoose';

const AttendanceSchema = new mongoose.Schema({
    employeeId: { type: String, required: true },
    name: { type: String, required: true },
    attendanceStatus: { type: String, enum: ['present', 'leave'], required: true },
    clockIn: { type: Date, required: true },
    clockOut: { type: Date },
    hoursWorked: { type: Number, default: 0 },
    overtimeHours: { type: Number, default: 0 },
});

const Attendance = mongoose.model('Attendance', AttendanceSchema);
export default Attendance;
