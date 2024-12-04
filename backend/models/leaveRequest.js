import mongoose from 'mongoose';


const leaveRequestSchema = new mongoose.Schema({
  employeeId: { type: String, required: true }, 
  leaveType: { type: String, required: true },
  numberOfDays: { type: Number, required: true },
  leaveStartDate: { type: Date, required: true },
  leaveEndDate: { type: Date, required: true },
  reason: { type: String, required: true },
  ccEmail: { type: String },
  toEmail: { type: String },
  approved: { type: Boolean, default: false }, 
});

const LeaveRequest = mongoose.model('LeaveRequest', leaveRequestSchema);


const leaveApprovalSchema = new mongoose.Schema({
    leaveRequestId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'LeaveRequest', 
      required: true 
    }, 
    approverId: { 
      type: String, 
      required: true 
    },
    approvalStatus: { 
      type: Boolean, 
      required: true 
    }, 
    approvalDate: { 
      type: Date, 
      required: true 
    },
    comments: { 
      type: String, 
      default: "" 
    }, 
  });

const LeaveApproval = mongoose.model('LeaveApproval', leaveApprovalSchema);

export { LeaveRequest, LeaveApproval };
