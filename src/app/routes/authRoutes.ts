import express from 'express';
import { AuthController } from '../controllers/authController';


const router = express.Router();

router.post('/login', AuthController.loginUser);
router.post('/register', AuthController.registerUser);
router.get('/profile', AuthController.getUserProfile);

export const AuthRoutes = router;