import express from 'express';
import { addVet, confirmVet, authentificateVet, vetProfile } from '../controllers/vetController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', addVet);
router.get('/confirm/:token', confirmVet);
router.post('/login', authentificateVet);

router.get('/profile', authMiddleware, vetProfile)

export default router;
