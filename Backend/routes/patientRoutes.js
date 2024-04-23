import express from 'express';
import { getPatients, addPatient, getPatient, removePatient, updatePatient } from '../controllers/patientController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router
    .route('/')
    .get(authMiddleware, getPatients)
    .post(authMiddleware, addPatient)
router
    .route('/:id')
    .get(authMiddleware, getPatient)
    .delete(authMiddleware, removePatient)
    .put(authMiddleware, updatePatient);


export default router;
