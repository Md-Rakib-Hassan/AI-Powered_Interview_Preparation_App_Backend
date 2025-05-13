import express from "express"
import protect from "../middlewares/authMiddleware";
import { SessionController } from "../controllers/sessionController";

const router = express.Router();

router.post('/create', protect, SessionController.createSession);
router.get('/my-sessions', protect, SessionController.getMySessions);
router.get('/:id', protect, SessionController.getSessionById);
router.delete('/:id', protect, SessionController.deleteSession);

const sessionRoutes = router;
export default sessionRoutes;