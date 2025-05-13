import express from "express"
import protect from "../middlewares/authMiddleware";
import { QuestionController } from "../controllers/questionController";

const router = express.Router();

router.post('/add', protect,QuestionController.addQuestionToSession );
router.post('/:id/pin', protect,QuestionController.togglePinQuestion );
router.post('/:id/note', protect,QuestionController.updateQuestionNote );


const questionRoutes = router;
export default questionRoutes;