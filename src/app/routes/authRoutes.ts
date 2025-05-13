import express from 'express';
import { AuthController } from '../controllers/authController';
import protect from '../middlewares/authMiddleware';
import upload from '../middlewares/uploadMiddleware';


const router = express.Router();

router.post('/login', AuthController.loginUser);
router.post('/register', AuthController.registerUser);
router.get('/profile', protect, AuthController.getUserProfile);
router.post("/upload-image", upload.single("image"), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
    }
    const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`
    res.status(200).json({ imageUrl });
})

export const AuthRoutes = router;