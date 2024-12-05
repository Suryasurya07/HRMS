import React, { useState, useEffect } from 'react';
import { Container, TextField, Button, Typography, MenuItem, Grid, Paper, Checkbox, FormControlLabel, IconButton } from '@mui/material';
import { motion } from 'framer-motion';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers';
import CloseIcon from '@mui/icons-material/Close'; // Importing close icon

const LeaveRequestForm = ({ selectedDate, onClose }) => {
  const [employeeId, setEmployeeId] = useState('');
  const [leaveType, setLeaveType] = useState('sick');
  const [leaveSessions, setLeaveSessions] = useState({ firstSession: false, secondSession: false });
  const [leaveStartDate, setLeaveStartDate] = useState(selectedDate || null);
  const [otherReason, setOtherReason] = useState('');
  const [reason, setReason] = useState('');
  const [message, setMessage] = useState('');
  const [approvalStatus, setApprovalStatus] = useState(null);
  const [isAwaitingApproval, setIsAwaitingApproval] = useState(false);
  const [ccEmail, setCcEmail] = useState('');
  const [toEmail, setToEmail] = useState(''); // Accepting HR or Employee ID instead of email

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Removed email validation, since these are employee or HR IDs now
    const numberOfDays = leaveSessions.firstSession && leaveSessions.secondSession ? 1 : (leaveSessions.firstSession || leaveSessions.secondSession ? 0.5 : 0);

    const leaveRequest = {
      employeeId,
      leaveType,
      numberOfDays,
      leaveStartDate,
      leaveEndDate: numberOfDays === 1 ? leaveStartDate : '',
      reason: leaveType === 'other' ? otherReason : reason,
      ccEmail,  // Can now be another employee/HR ID
      toEmail,  // Can now be another employee/HR ID
    };

    try {
      const response = await fetch('http://localhost:5000/api/leave-requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(leaveRequest),
      });

      if (response.ok) {
        setMessage('Leave request submitted successfully');
        setIsAwaitingApproval(true);
        resetForm();
      } else {
        const errorData = await response.json();
        setMessage(errorData?.message || 'Failed to submit leave request');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('Error occurred while submitting leave request');
    }
  };

  const resetForm = () => {
    setLeaveType('sick');
    setLeaveSessions({ firstSession: false, secondSession: false });
    setLeaveStartDate(null);
    setOtherReason('');
    setReason('');
    setCcEmail('');
    setToEmail('');
  };

  const fetchApprovalStatus = async () => {
    if (!isAwaitingApproval) return;
  
    try {
      // Replace employeeUsername with employeeId
      const response = await fetch(`http://localhost:5000/api/leave-requests/status/${employeeId}`);
      if (response.ok) {
        const data = await response.json();
        if (data.status === 'Approved') {
          setApprovalStatus('Approved');
          setIsAwaitingApproval(false);
        } else if (data.status === 'Rejected') {
          setApprovalStatus('Rejected');
          setIsAwaitingApproval(false);
        }
      } else {
        console.error('Failed to fetch approval status');
      }
    } catch (error) {
      console.error('Error fetching approval status:', error);
    }
  };
  

  useEffect(() => {
    const intervalId = setInterval(fetchApprovalStatus, 5000);
    return () => clearInterval(intervalId);
  }, [isAwaitingApproval, employeeId]);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Container
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 1000,
          backgroundColor: 'rgba(0, 0, 0, 0)',
          
        }}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <Paper elevation={3} sx={{
            padding: 3,
            width: '100%',
            maxWidth: '500px',
            position: 'relative',
            borderRadius: '16px', // Curved corners for the Paper component
            backgroundColor: '#fff',
          }}>
            <IconButton
              sx={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                color: 'gray',
                borderRadius: '50%', // Rounded button
                '&:hover': {
                  backgroundColor: '#f0f0f0',
                },
              }}
              onClick={onClose} // Close the form when clicked
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h5" gutterBottom align="center" color="#212121">
              Leave Request Form
            </Typography>
            {message && <Typography color="error" align="center">{message}</Typography>}
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    label="Employee Username"
                    variant="outlined"
                    fullWidth
                    value={employeeId}
                    onChange={(e) => setEmployeeId(e.target.value)}
                    required
                    sx={{
                      borderRadius: '12px', // Curved corners for the TextField
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Leave Type"
                    variant="outlined"
                    select
                    fullWidth
                    value={leaveType}
                    onChange={(e) => setLeaveType(e.target.value)}
                    required
                    sx={{
                      borderRadius: '12px', // Curved corners for the TextField
                    }}
                  >
                    <MenuItem value="sick">Sick Leave</MenuItem>
                    <MenuItem value="casual">Casual Leave</MenuItem>
                    <MenuItem value="other">Other</MenuItem>
                  </TextField>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle1" gutterBottom>Select Sessions</Typography>
                  <Grid container spacing={1}>
                    <Grid item xs={6}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={leaveSessions.firstSession}
                            onChange={(e) => setLeaveSessions({ ...leaveSessions, firstSession: e.target.checked })}
                          />
                        }
                        label="First Session"
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={leaveSessions.secondSession}
                            onChange={(e) => setLeaveSessions({ ...leaveSessions, secondSession: e.target.checked })}
                          />
                        }
                        label="Second Session"
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <DatePicker
                    label="Leave Date"
                    value={leaveStartDate}
                    onChange={(newValue) => setLeaveStartDate(newValue)}
                    TextFieldComponent={TextField}
                    required
                    sx={{
                      borderRadius: '12px', // Curved corners for the DatePicker
                    }}
                  />
                </Grid>
                {leaveType === 'other' ? (
                  <Grid item xs={12}>
                    <TextField
                      label="Reason for Leave"
                      variant="outlined"
                      fullWidth
                      multiline
                      rows={3}
                      value={otherReason}
                      onChange={(e) => setOtherReason(e.target.value)}
                      required
                      sx={{
                        borderRadius: '12px', // Curved corners for the TextField
                      }}
                    />
                  </Grid>
                ) : (
                  <Grid item xs={12}>
                    <TextField
                      label="Reason for Leave"
                      variant="outlined"
                      fullWidth
                      multiline
                      rows={3}
                      value={reason}
                      onChange={(e) => setReason(e.target.value)}
                      required
                      sx={{
                        borderRadius: '12px', // Curved corners for the TextField
                      }}
                    />
                  </Grid>
                )}
                <Grid item xs={12}>
                  <TextField
                    label="To (Employee/HR ID)"
                    variant="outlined"
                    fullWidth
                    value={toEmail}  // This field now accepts an ID, not an email
                    onChange={(e) => setToEmail(e.target.value)}
                    required
                    sx={{
                      borderRadius: '12px', // Curved corners for the TextField
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="CC (Employee/HR ID)"
                    variant="outlined"
                    fullWidth
                    value={ccEmail}  // This field now accepts an ID, not an email
                    onChange={(e) => setCcEmail(e.target.value)}
                    sx={{
                      borderRadius: '12px', // Curved corners for the TextField
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{
                      borderRadius: '12px', // Curved corners for the button
                      padding: '12px',
                    }}
                  >
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </motion.div>
      </Container>
    </LocalizationProvider>
  );
};

export default LeaveRequestForm;
