import express from 'express';
import { getUserInfo, loginUser, registerUser } from '../controllers/authControllers';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
///router.get('/user', protect, getUserInfo);

export default router;