import express from 'express';
import { getPatient, addPatient } from '../controllers/patientController.js';

const router = express.Router();

router.route('/').get(getPatient).post(addPatient)


export default router;
