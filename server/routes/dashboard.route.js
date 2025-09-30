import express from 'express';
import { getDashboard, createDashboard } from '../controllers/dashboard.controller.js';

const router = express.Router();

router.get('/', getDashboard);
router.post('/', createDashboard);

export default router;
