import QuestionModel from "../models/Question";
import SessionModel from "../models/Session";



const addQuestionToSession = async (req, res) => {
    try {
        const { sessionId, questions } = req.body;
        if (!sessionId || !questions || !Array.isArray(questions)) {
            return res.status(404).json({ message: "Invalid input data" });
        }
        const session = await SessionModel.findById(sessionId);

        if (!session) {
            return res.status(404).json({ message: "Session not found" });
        }

        const createdQuestions = await QuestionModel.insertMany(
            questions.map(q => ({
                session: sessionId,
                question: q.question,
                answer: q.answer,
            }))
        );
        session.questions.push(...createdQuestions.map(q => q._id));
        await session.save();
        res.status(201).json(createdQuestions);
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error" });
    }
}

const togglePinQuestion=async (req, res) => {
    try {
        
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error" });
    }
}

const updateQuestionNote=async (req, res) => {
    try {
        
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error" });
    }
}

export const QuestionController = {
    addQuestionToSession,
    togglePinQuestion,
    updateQuestionNote
}