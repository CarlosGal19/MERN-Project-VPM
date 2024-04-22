import express from 'express';
import { addVet } from '../controllers/vetController.js';

const router = express.Router();

router.post('/', addVet);

export default router;
