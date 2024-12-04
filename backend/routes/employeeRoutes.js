import express from 'express';
import { verifyToken } from '../middleware/authMiddleware.js';
import { addEmployee, login , getEmployees ,employeeName } from '../controllers/employeeController.js';

const router = express.Router();

router.post('/login', login);
router.post('/employees', addEmployee);
router.get('/employees', getEmployees);
router.get('/employees/:EMPid', employeeName);
router.get('/protected', verifyToken, (req, res) => {
    res.json({ message: 'Access granted', user: req.user });
});

export {router} ;
