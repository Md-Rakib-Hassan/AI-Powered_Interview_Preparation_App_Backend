import QuestionModel from "../models/Question";
import SessionModel from "../models/Session";


const createSession = async (req, res) => {
    try {
        const { role, experience, topicsToFocus, descriptions, questions } = req.body;
        const userId = req.user._id;

        const session = await SessionModel.create({
            user: userId,
            role,
            experience,
            topicsToFocus,
            descriptions,
        });

        const questionDocs = await Promise.all(
            questions.map(async (q) => {
                const question = await QuestionModel.create({
                    session: session._id,
                    question: q.question,
                    answer: q.answer
                });
                return question._id;
            })
        )
        session.questions = questionDocs;
        await session.save();

        res.status(201).json({ success: true, session });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
}


const getMySessions = async (req, res) => {
    try {
        const sessions = await SessionModel.find({ user: req.user.id }).sort({ createdAt: -1 }).populate("questions");
        res.status(200).json(sessions);
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error" });
    }
}



const getSessionById = async (req, res) => {
    try {
        
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error" });
    }
}


const deleteSession = async (req, res) => {
    try {
        
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error" });
    }
}

export const  SessionController = {
    createSession,
    getMySessions,
    getSessionById,
    deleteSession
}