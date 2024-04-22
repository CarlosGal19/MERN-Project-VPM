import express from 'express';
import { getProfile, addVet } from '../controllers/vetController.js';

const router = express.Router();

router.post('/', addVet);

export default router;
