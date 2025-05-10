import express from 'express';
import { AuthController } from '../controllers/authController';
import protect from '../middlewares/authMiddleware';


const router = express.Router();

router.post('/login', AuthController.loginUser);
router.post('/register', AuthController.registerUser);
router.get('/profile',protect,AuthController.getUserProfile);

export const AuthRoutes = router;