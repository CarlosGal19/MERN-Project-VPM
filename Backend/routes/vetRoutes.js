import express from 'express';
import { addVet, confirmVet, authentificateVet, vetProfile, resetPassword, validateToken, newPassword } from '../controllers/vetController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', addVet);
router.get('/confirm/:token', confirmVet);
router.post('/login', authentificateVet);
router.post('/reset-password', resetPassword);

router.route('/reset-password/:token').get(validateToken).post(newPassword);
// router.get('/reset-password/:token', validateToken);
// router.post('/reset-password/:token', newPassword);

router.get('/profile', authMiddleware, vetProfile);


export default router;
