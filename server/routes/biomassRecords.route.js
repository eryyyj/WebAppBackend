import express from 'express';
import { getBiomassRecords } from '../controllers/biomassRecord.controller.js';

const router = express.Router();

router.get('/', getBiomassRecords);

export default router;
