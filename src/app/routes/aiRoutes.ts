import express from 'express';
import protect from '../middlewares/authMiddleware';

const router = express.Router();

router.post('/generate-questions', protect,);
router.post('/generate-explanation', protect);

export const AiRoutes = router;