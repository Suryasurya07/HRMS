// controllers/leaveRequestController.js
import { LeaveRequest, LeaveApproval } from '../models/leaveRequest.js'; // Default import

// Request leave function
export const requestLeave = async (req, res) => {
  const { employeeId, leaveType, numberOfDays, leaveStartDate, leaveEndDate, reason, ccEmail, toEmail } = req.body;

  const newLeaveRequest = new LeaveRequest({
    employeeId,
    leaveType,
    numberOfDays,
    leaveStartDate,
    leaveEndDate,
    reason,
    ccEmail,
    toEmail,
  });

  try {
    await newLeaveRequest.save();
    res.status(201).json(newLeaveRequest); // Return the newly created leave request
  } catch (err) {
    console.error('Error requesting leave:', err);
    res.status(500).send('Server error');
  }
};

// Approve leave function
export const approveLeave = async (req, res) => {
  const { employeeId, leaveStartDate } = req.params;

  try {
    // Find the leave request by employeeId and leaveStartDate and update its approved status
    const leaveRequest = await LeaveRequest.findOneAndUpdate(
      { employeeId, leaveStartDate },
      { approved: true }, // Update 'approved' field to true
      { new: true } // Return the updated document
    );

    if (!leaveRequest) {
      return res.status(404).json({ message: 'Leave request not found' });
    }

    res.json(leaveRequest);
  } catch (error) {
    console.error('Error approving leave request:', error.message);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};



// Get leave requests function
export const getLeaveRequests = async (req, res) => {
  try {
    const leaveRequests = await LeaveRequest.find(); // Fetch all leave requests
    res.status(200).json(leaveRequests); // Return the list of leave requests
  } catch (err) {
    console.error('Error fetching leave requests:', err);
    res.status(500).send('Server error');
  }
};
