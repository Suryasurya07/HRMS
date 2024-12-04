import express from 'express';
import { addAttendance, getAttendance } from '../controllers/attendanceController.js';

const router = express.Router();

router.post('/attendance', addAttendance);
router.get('/attendance', getAttendance);

export { router };
