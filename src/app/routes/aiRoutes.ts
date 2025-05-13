import express from 'express';
import protect from '../middlewares/authMiddleware';
import { AiController } from '../controllers/aiController';

const router = express.Router();

router.post('/generate-questions', protect,AiController.generateInterviewQuestions);
router.post('/generate-explanation', protect, AiController.generateConceptExplanation);

export const AiRoutes = router;