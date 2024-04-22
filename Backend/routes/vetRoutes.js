import express from 'express';
import { addVet, confirmVet } from '../controllers/vetController.js';

const router = express.Router();

router.post('/', addVet);
router.get('/confirm/:token', confirmVet)

export default router;
