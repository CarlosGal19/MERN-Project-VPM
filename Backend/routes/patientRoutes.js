import express from 'express';
import { getPatients, addPatient } from '../controllers/patientController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(getPatients).post(authMiddleware, addPatient)


export default router;
