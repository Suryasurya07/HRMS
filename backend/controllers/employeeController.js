import Employee from '../models/employee.js';
import jwt from 'jsonwebtoken';

export const addEmployee = async (req, res) => {

  console.log('Incoming Data:', req.body);
  const { 
    EMPid,
    name,
    department,
    contact,
    status,
    credentials, 
    employeeRole,
    employeeEmail,
    employeeDob,
    employeeAddress,
    employeeEmergencyContact,
    employeeQualifications,
    employeeExperience,
    hr,
    teamLead,
    profilePicture,
    documents,
    salary,
  } = req.body;

  // Validate the required fields
  if (!EMPid || !name || !department || !salary) {
    return res.status(400).json({ message: 'Missing required fields: EMPid, name, department, or salary.' });
  }

  // Ensure salary is an array with a single object
  if (!Array.isArray(salary) || salary.length !== 1) {
    return res.status(400).json({ message: 'Salary must be an array with a single object.' });
  }

  const salaryDetails = salary[0]; // Access the first object in the salary array

  // Validate the salary structure
  if (
    !salaryDetails.totalSalary ||
    !salaryDetails.splAllow ||
    !salaryDetails.medAllow ||
    !salaryDetails.convAllow ||
    !salaryDetails.hra ||
    !salaryDetails.DOJ ||
    !salaryDetails.earnedBasic ||
    !salaryDetails.fixedWages ||
    !salaryDetails.uan
  ) {
    return res.status(400).json({ message: 'Invalid salary data structure.' });
  }

  try {
    const employee = new Employee({
      EMPid,
      name,
      department,
      contact,
      status,
      credentials: { username: credentials.username, password: credentials.password },
      employeeRole,
      employeeEmail,
      employeeDob,
      employeeAddress,
      employeeEmergencyContact,
      employeeQualifications,
      employeeExperience,
      hr,
      teamLead,
      profilePicture,
      documents,
      salary: salaryDetails, // Directly use the first object in the salary array
    });

    await employee.save();
    console.log('Employee added successfully:', employee);
    res.status(201).json(employee);
  } catch (err) {
    console.error('Error adding employee:', err);
    res.status(500).send('Server error');
  }
};

export const getEmployees = async (req, res) => {
  try {
    // Fetch employees from the database
    const employees = await Employee.find(); // Assuming Employee is the model for the employees collection
    res.status(200).json({ employees }); // Return employees as a JSON response
  } catch (error) {
    res.status(500).json({ message: 'Error fetching employees', error: error.message });
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;

  try {
      const employee = await Employee.findOne({ 'credentials.username': username });

      if (!employee || employee.credentials.password !== password) {
          return res.status(401).json({ message: 'Invalid username or password' });
      }

      // Generate a JWT token
      const token = jwt.sign(
          { id: employee._id, role: employee.credentials.username.startsWith('emp') ? 'employee' : 'hr' },
          process.env.JWT_SECRET, // Use a secure, environment-stored secret
          { expiresIn: '1h' }     // Set token expiration
      );

      res.json({
          message: 'Login successful',
          token,  // Send token to the frontend
          role: employee.credentials.username.startsWith('emp') ? 'employee' : 'hr'
      });
  } catch (err) {
      console.error('Error during login:', err);
      res.status(500).send('Server error');
  }
};


export const employeeName = async (req, res) => {
  const { EMPid } = req.params;

  try {
    // Find the employee by EMPid
    const employee = await Employee.findOne({ EMPid });

    if (!employee) {
      return res.status(404).json({ message: `Employee with EMPid ${EMPid} not found` });
    }

    // Respond with the employee's name
    res.status(200).json({ name: employee.name });
  } catch (error) {
    console.error('Error fetching employee name:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

