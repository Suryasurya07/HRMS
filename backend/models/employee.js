import mongoose from 'mongoose';

const employeeSchema = new mongoose.Schema({
  EMPid: { type: String, required: true },
  name: { type: String, required: true },
  department: { type: String, required: true },
  contact: { type: String },
  status: { type: String },
  credentials: {
    username: { type: String, required: true },
    password: { type: String, required: true },
  },
  employeeRole: { type: String },
  employeeEmail: { type: String },
  employeeDob: { type: Date },
  employeeAddress: { type: String },
  employeeEmergencyContact: { type: String },
  employeeQualifications: { type: String },
  employeeExperience: { type: String },
  hr: { type: String },
  teamLead: { type: String },
  profilePicture: { type: String },
  documents: [{ type: String }],
  salary: [
    {
      DOJ: { type: Number, required: true },
      convAllow: { type: Number, required: true },
      earnedBasic: { type: Number, required: true },
      fixedWages: { type: Number, required: true },
      hra: { type: Number, required: true },
      medAllow: { type: Number, required: true },
      splAllow: { type: Number, required: true },
      totalSalary: { type: Number, required: true },
      uan: { type: Number, required: true },
    },
  ],
});

const Employee = mongoose.model('Employee', employeeSchema);
export default Employee;
