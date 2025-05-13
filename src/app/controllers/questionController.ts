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
        const question = await QuestionModel.findById(req.params.id);

        if (!question) {
            return res.status(404).json({ success: false, message: "Question not found" });
        }

        question.isPinned = !question.isPinned;
        await question.save();
        res.status(200).json({ success: true, question });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error" });
    }
}

const updateQuestionNote=async (req, res) => {
    try {
        const { note } = req.body;
        const question = await QuestionModel.findById(req.params.id);

        if (!question) {
            return res.status(404).json({ success: false, message: "Question not found" });
        }

        question.note = note || "";
        await question.save();
        res.status(200).json({ success: true, question });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error" });
    }
}

export const QuestionController = {
    addQuestionToSession,
    togglePinQuestion,
    updateQuestionNote
}