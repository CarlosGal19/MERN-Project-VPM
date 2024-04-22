import express from 'express';
import { addVet, confirmVet, authentificateVet } from '../controllers/vetController.js';

const router = express.Router();

router.post('/', addVet);
router.get('/confirm/:token', confirmVet)
router.post('/login', authentificateVet)

export default router;
