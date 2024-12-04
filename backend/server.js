import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import { router as employeeRoutes } from './routes/employeeRoutes.js';
import { router as attendanceRoutes } from './routes/attendanceRoutes.js';
import { router as leaveRequestRoutes } from './routes/leaveRequestRoutes.js';
import { router as salaryRoutes } from './routes/salaryRoutes.js';  // Import salary route

dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json()); // To parse incoming JSON requests

// Routes
app.use('/api', employeeRoutes);
app.use('/api', attendanceRoutes);
app.use('/api', leaveRequestRoutes);
app.use('/api/salaries', salaryRoutes);  // Mount salary routes with '/api/salaries'

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
