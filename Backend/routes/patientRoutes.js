import express from 'express';
import { getPatients, addPatient } from '../controllers/patientController.js';

const router = express.Router();

router.route('/').get(getPatients).post(addPatient)


export default router;
