import mongoose from 'mongoose';
import Salary from '../models/salaryModel.js';

// Fetch All Salaries
export const getSalaries = async (req, res) => {
    try {
        // Fetch all salaries and populate employee details
        const salaries = await Salary.find().populate('employeeId', 'name department');

        if (!salaries.length) {
            return res.status(404).json({ message: 'No salary records found' });
        }

        return res.status(200).json(salaries);
    } catch (error) {
        console.error('Error fetching salaries:', error.message);
        return res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// Create or Update Salary
export const createOrUpdateSalary = async (req, res) => {
    const {
        employeeId,
        name,
        department,
        totalSalary,
        grossSalary,
        leaveDeduction,
        hoursWorked,
        overtimeHours,
        leaveDays,
    } = req.body;

    // Validate input fields
    if (!employeeId || typeof employeeId !== 'string') {
        return res.status(400).json({
            message: 'Invalid employeeId. It must be a non-empty string.',
        });
    }

    if (
        !name ||
        !department ||
        totalSalary === undefined ||
        grossSalary === undefined ||
        leaveDeduction === undefined ||
        hoursWorked === undefined ||
        overtimeHours === undefined ||
        leaveDays === undefined
    ) {
        return res.status(400).json({
            message: 'Invalid input. Please ensure all fields are provided and valid.',
        });
    }

    try {
        // Create or update salary using findOneAndUpdate
        const updatedSalary = await Salary.findOneAndUpdate(
            { employeeId }, // Match by employeeId
            {
                employeeId,
                name,
                department,
                totalSalary,
                grossSalary,
                leaveDeduction,
                hoursWorked,
                overtimeHours,
                leaveDays,
            },
            {
                new: true, // Return updated document
                upsert: true, // Create a new record if not found
            }
        );

        const message = updatedSalary ? 'Salary updated successfully' : 'Salary created successfully';

        return res.status(200).json({ message, salary: updatedSalary });
    } catch (error) {
        console.error(`Error processing salary data: ${error.message}`);
        return res.status(500).json({
            message: 'Failed to process salary data',
            error: error.message,
        });
    }
};

