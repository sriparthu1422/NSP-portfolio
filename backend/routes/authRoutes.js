import express from 'express';
import { login, logout, getMe } from '../controllers/authController.js';
import { protect, optionalProtect } from '../middleware/auth.js';

const router = express.Router();

router.post('/login', login);
router.get('/logout', logout);
router.get('/me', optionalProtect, getMe);

export default router;
