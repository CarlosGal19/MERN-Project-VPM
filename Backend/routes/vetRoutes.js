import express from 'express';
import { getVets } from '../controllers/vetController.js';

const router = express.Router();

router.get('/', getVets);

export default router;
