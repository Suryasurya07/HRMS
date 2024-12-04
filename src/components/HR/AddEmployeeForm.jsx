import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    UserPlus,
    Briefcase,
    IdCard,
    Phone,
    Calendar,
    Home,
    Mail,
    Shield,
    Lock,
} from 'lucide-react';
import { TextField, Button, Grid, Typography } from '@mui/material';

const AddEmployeeForm = () => {
    const [employeeDetails, setEmployeeDetails] = useState({
        EMPid: '',
        name: '',
        department: '',
        contact: '',
        status: 'Active',
        credentials: {
            username: '',
            password: '',
        },
        employeeRole: '',
        employeeEmail: '',
        employeeDob: '',
        employeeAddress: '',
        employeeEmergencyContact: '',
        employeeQualifications: '',
        employeeExperience: '',
        hr:'',
        teamLead:'',
        profilePicture: null,
        documents: [],
        salary: [
            {   
                uan: '',
                fixedWages: '',
                earnedBasic: '',
                DOJ: '',
                hra: '',
                convAllow: '',
                medAllow: '',
                splAllow: '',
                totalSalary: '' // To be calculated before submission
            }
        ],
    });

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');


    const textFieldStyles = {
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: 'white',
            },
            '&:hover fieldset': {
                borderColor: 'white',
            },
            '&.Mui-focused fieldset': {
                borderColor: 'blue', // Blue focus color
            },
        },
        '& .MuiInputLabel-root': {
            color: 'white',
        },
        '& .MuiInputBase-root': {
            color: 'white',
        },
    };

    const handleChange = (e) => {
        const { name, value, files } = e.target;

        if (name === 'username' || name === 'password') {
            setEmployeeDetails((prev) => ({
                ...prev,
                credentials: {
                    ...prev.credentials,
                    [name]: value,
                },
            }));
        } else if (name === 'profilePicture') {
            setEmployeeDetails((prev) => ({
                ...prev,
                profilePicture: files[0],
            }));
        } else if (name === 'documents') {
            setEmployeeDetails((prev) => ({
                ...prev,
                documents: [...files],
            }));
        } else {
            setEmployeeDetails((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    };

    const addSalaryRow = () => {
        setEmployeeDetails((prev) => ({
            ...prev,
            salary: [...prev.salary, { uan: '', fixedWages: '', earnedBasic: '', DOJ: '', hra: '', convAllow: '', medAllow: '', splAllow: '', totalSalary: '' }],
        }));
    };

    const removeSalaryRow = (index) => {
        const updatedSalary = employeeDetails.salary.filter((_, i) => i !== index);
        setEmployeeDetails((prev) => ({
            ...prev,
            salary: updatedSalary,
        }));
    };

    const handleSalaryChange = (e, index, field) => {
        const value = e.target.value;
        setEmployeeDetails((prev) => {
            const updatedSalary = [...prev.salary];
            updatedSalary[index][field] = value;
            return {
                ...prev,
                salary: updatedSalary,
            };
        });
    };

    // Calculate Total Salary
    const calculateTotalSalary = (salaryRow) => {
        return [
            parseFloat(salaryRow.earnedBasic || 0),
            parseFloat(salaryRow.hra || 0),
            parseFloat(salaryRow.convAllow || 0),
            parseFloat(salaryRow.medAllow || 0),
            parseFloat(salaryRow.splAllow || 0),
        ].reduce((total, amount) => total + amount, 0).toFixed(2); // Return calculated total salary as a string
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setMessage('');
        setLoading(true);
    
        // Validations
        const validateEmail = (email) => {
            const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return re.test(String(email).toLowerCase());
        };
    
        const validatePhone = (phone) => {
            const re = /^[0-9]{10}$/;
            return re.test(String(phone));
        };
    
        if (!validateEmail(employeeDetails.employeeEmail)) {
            setLoading(false);
            return setMessage('Invalid email format.');
        }
    
        if (!validatePhone(employeeDetails.contact)) {
            setLoading(false);
            return setMessage('Invalid phone number format.');
        }

        // Calculate totalSalary for each salary row
        const updatedSalary = employeeDetails.salary.map((row) => ({
            ...row,
            totalSalary: calculateTotalSalary(row),
        }));

        // Create a unique employee ID
        const uniqueId = Date.now().toString();

        const newEmployee = {
            ...employeeDetails,
            EMPid: uniqueId,
            
            salary: updatedSalary, // Use the updated salary with totalSalary
        };

        const isValidPayload = newEmployee.name && newEmployee.contact && newEmployee.employeeEmail && newEmployee.salary.length > 0;
        if (!isValidPayload) {
    setMessage('Please fill all required fields.');
    setLoading(false);
    return;
}

        console.log("Submitting employee data:", newEmployee);


        try {
            const response = await fetch('http://localhost:5000/api/employees', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newEmployee),
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Server error: ${errorText}`);
            }
    
            // Reset form after successful addition
            setEmployeeDetails({
                EMPid: '',
                name: '',
                department: '',
                contact: '',
                status: 'Active',
                credentials: {
                    username: '',
                    password: '',
                },
                employeeRole: '',
                employeeEmail: '',
                employeeDob: '',
                employeeAddress: '',
                employeeEmergencyContact: '',
                employeeQualifications: '',
                employeeExperience: '',
                hr: '',
                teamLead: '',
                profilePicture: null,
                documents: [],
                salary: [{
                    uan: '',
                    fixedWages: '',
                    earnedBasic: '',
                    DOJ: '',
                    hra: '',
                    convAllow: '',
                    medAllow: '',
                    splAllow: '',
                    totalSalary: '',
                }],
            });
            setMessage('Employee added successfully!');
        } catch (error) {
            console.error('Error:', error);
            setMessage('Error adding employee: ' + error.message);
        } finally {
            setLoading(false);
        }
    };
    

    return (
        <div className="mt-16 max-w-7xl mx-auto px-4">
            <motion.form
                onSubmit={handleSubmit}
                className="flex flex-wrap justify-between space-y-4"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                aria-live="polite"
            >
                <Grid container spacing={3}>
                    {/* Input Fields */}
                    {[{
                        id: 'EMPid', label: 'Employee ID', icon: <IdCard className="mr-2 text-white" />,
                    }, {
                        id: 'name', label: 'Employee Name', icon: <UserPlus className="mr-2 text-white" />,
                    }, {
                        id: 'department', label: 'Department', icon: <Briefcase className="mr-2 text-white" />,
                    }, {
                        id: 'employeeRole', label: 'Role', icon: <Briefcase className="mr-2 text-white" />,
                    }, {
                        id: 'employeeEmail', label: 'Email', icon: <Mail className="mr-2 text-white" />,
                    }, {
                        id: 'contact', label: 'Contact', icon: <Phone className="mr-2 text-white" />,
                    }, {
                        id: 'employeeDob', label: 'Date of Birth', icon: <Calendar className="mr-2 text-white" />, type: 'date',
                    }, {
                        id: 'employeeAddress', label: 'Address', icon: <Home className="mr-2 text-white" />,
                    }, {
                        id: 'employeeEmergencyContact', label: 'Emergency Contact', icon: <Shield className="mr-2 text-white" />,
                    }, {
                        id: 'employeeQualifications', label: 'Qualifications', icon: <IdCard className="mr-2 text-white" />,
                    }, {
                        id: 'employeeExperience', label: 'Experience (Years)', icon: <Briefcase className="mr-2 text-white" />,
                    },{
                        id: 'hr', label: 'HR', icon: <IdCard className="mr-2 text-white" />,
                    }, {
                        id: 'teamLead', label: 'Team Lead', icon: <Briefcase className="mr-2 text-white" />,
                    }].map(({ id, label, icon, type = 'text' }) => (
                        <Grid item xs={12} sm={6} md={4} key={id}>
                            <motion.div
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.7 }}
                            >
                                <TextField
                                    label={label}
                                    name={id}
                                    value={employeeDetails[id] || ''}
                                    onChange={handleChange}
                                    fullWidth
                                    type={type}
                                    InputProps={{
                                        startAdornment: icon,
                                    }}
                                    sx={textFieldStyles}
                                />
                            </motion.div>
                        </Grid>
                        
                    ))}
                   


                    {/* Username and Password Fields */}
                    {['username', 'password'].map((field) => (
                        <Grid item xs={12} sm={6} md={4} key={field}>
                            <TextField
                                label={field === 'username' ? 'Username' : 'Password'}
                                name={field}
                                value={employeeDetails.credentials[field] || ''}
                                onChange={handleChange}
                                fullWidth
                                type={field === 'password' ? 'password' : 'text'}
                                InputProps={{
                                    startAdornment: field === 'password' ? <Lock className="mr-2 text-white" /> : <IdCard className="mr-2 text-white" />,
                                }}
                                sx={textFieldStyles}
                            />
                        </Grid>
                    ))}

                    {/* Salary Details Section */}
                   {/* Salary Details Section */}
<Grid item xs={12}>
    <Typography variant="h6">Salary Details</Typography>
    {employeeDetails.salary.map((salaryRow, index) => (
        <Grid container spacing={3} key={index}>
            
            
            {/* Add UAN Number */}
            <Grid item xs={12} sm={6} md={4}>
                <TextField
                    label="UAN Number"
                    name="uan"
                    value={salaryRow.uan}
                    onChange={(e) => handleSalaryChange(e, index, 'uan')}
                    fullWidth
                    type="text"
                    sx={textFieldStyles}
                />
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
                <TextField
                    label="DOJ"
                    name="DOJ"
                    value={salaryRow.DOJ}
                    onChange={(e) => handleSalaryChange(e, index, 'DOJ')}
                    fullWidth
                    type="number"
                    sx={textFieldStyles}
                />
            </Grid>
            {/* Add Fixed Wages */}
            <Grid item xs={12} sm={6} md={4}>
                <TextField
                    label="Fixed Wages"
                    name="fixedWages"
                    value={salaryRow.fixedWages}
                    onChange={(e) => handleSalaryChange(e, index, 'fixedWages')}
                    fullWidth
                    type="number"
                    sx={textFieldStyles}
                />
            </Grid>
            {/* Add Earned Basic */}
            <Grid item xs={12} sm={6} md={4}>
                <TextField
                    label="Earned Basic"
                    name="earnedBasic"
                    value={salaryRow.earnedBasic}
                    onChange={(e) => handleSalaryChange(e, index, 'earnedBasic')}
                    fullWidth
                    type="number"
                    sx={textFieldStyles}
                />
            </Grid>
            {/* Add HRA */}
            <Grid item xs={12} sm={6} md={4}>
                <TextField
                    label="HRA"
                    name="hra"
                    value={salaryRow.hra}
                    onChange={(e) => handleSalaryChange(e, index, 'hra')}
                    fullWidth
                    type="number"
                    sx={textFieldStyles}
                />
            </Grid>
            {/* Add CONV ALLOW */}
            <Grid item xs={12} sm={6} md={4}>
                <TextField
                    label="CONV ALLOW"
                    name="convAllow"
                    value={salaryRow.convAllow}
                    onChange={(e) => handleSalaryChange(e, index, 'convAllow')}
                    fullWidth
                    type="number"
                    sx={textFieldStyles}
                />
            </Grid>
            {/* Add MED ALLOW */}
            <Grid item xs={12} sm={6} md={4}>
                <TextField
                    label="MED ALLOW"
                    name="medAllow"
                    value={salaryRow.medAllow}
                    onChange={(e) => handleSalaryChange(e, index, 'medAllow')}
                    fullWidth
                    type="number"
                    sx={textFieldStyles}
                />
            </Grid>
            {/* Add SPL ALLOW */}
            <Grid item xs={12} sm={6} md={4}>
                <TextField
                    label="SPL ALLOW"
                    name="splAllow"
                    value={salaryRow.splAllow}
                    onChange={(e) => handleSalaryChange(e, index, 'splAllow')}
                    fullWidth
                    type="number"
                    sx={textFieldStyles}
                />
            </Grid>
            {/* Add Total Salary */}
            <Grid item xs={12} sm={6} md={4}>
                <TextField
                    label="Total Salary"
                    name="totalSalary"
                    value={calculateTotalSalary(salaryRow)}
                    onChange={(e) => handleSalaryChange(e, index, 'totalSalary')}
                    fullWidth
                    type="number"
                    sx={textFieldStyles}
                    InputProps={{
                        readOnly: true, // Make this field read-only
                    }}
                />
            </Grid>
            {/* Remove Salary Row Button */}
            <Grid item xs={12} sm={6} md={4}>
                <Button
                    variant="outlined"
                    color="error"
                    fullWidth
                    onClick={() => removeSalaryRow(index)}
                >
                    Remove Salary
                </Button>
            </Grid>
        </Grid>
    ))}
    <Button variant="outlined" color="primary" onClick={addSalaryRow}>
        Add Salary Row
    </Button>
</Grid>

                </Grid>

                {/* Submit Button */}
                <Grid item xs={12}>
                    <Button type="submit" variant="contained" fullWidth disabled={loading}>
                        {loading ? 'Adding...' : 'Add Employee'}
                    </Button>
                </Grid>
            </motion.form>

            {/* Success/Error Message */}
            {message && (
                <Typography variant="body1" color={message.includes('Error') ? 'error' : 'success'}>
                    {message}
                </Typography>
            )}
        </div>
    );
};

export default AddEmployeeForm;
