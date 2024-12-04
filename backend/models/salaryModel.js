import mongoose from 'mongoose';

const salarySchema = new mongoose.Schema(
  {
    employeeId: {
      type: String, // Use String instead of ObjectId
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    department: {
      type: String,
      required: true,
    },
    totalSalary: {
      type: Number,
      required: true,
    },
    grossSalary: {
      type: Number,
      required: true,
    },
    leaveDeduction: {
      type: Number,
      required: true,
    },
    hoursWorked: {
      type: Number,
      required: true,
    },
    overtimeHours: {
      type: Number,
      required: true,
    },
    leaveDays: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Salary = mongoose.model('Salary', salarySchema);

export default Salary;
