import express from 'express';
import { requestLeave, approveLeave ,getLeaveRequests,} from '../controllers/leaveRequestController.js';

const router = express.Router();

router.post('/leave-requests', requestLeave);
router.put('/leave-requests/:employeeId-:leaveStartDate', approveLeave);
router.get('/leave-requests', getLeaveRequests);

export {router};
