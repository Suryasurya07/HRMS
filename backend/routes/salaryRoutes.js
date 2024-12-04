import express from 'express';
import { getSalaries, createOrUpdateSalary } from '../controllers/salaryController.js';

const router = express.Router();

// Route to get all salaries
router.get('/', getSalaries); // Now it will work with '/api/salaries'

// Route to create or update salary data
router.post('/', createOrUpdateSalary); // Now it will work with '/api/salaries'

export { router };
