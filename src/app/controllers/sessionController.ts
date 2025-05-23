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
        const session = await SessionModel.findById(req.params.id).populate({
            path: "questions",
            options: { sort: { isPinned: -1, createdAt: 1 } },
        }).exec();

        if (!session) {
            return res.status(404).json({
                success: false,
                message: "Session is not found"
            });
        }
        res.status(200).json({ success: true, session });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error" });
    }
}


const deleteSession = async (req, res) => {
    try {
        const session = await SessionModel.findById(req.params.id);
        if (!session) {
            return res.status(404).json({ message: "Session not found" });
        }

        if (session.user?.toString() !== req.user.id) {
            return res.status(401).json({ message: "Not Authorized to delete this session" });
        }
        await QuestionModel.deleteMany({ session: session._id });
        await session.deleteOne();
        res.status(200).json({ message: "Session deleted successfully" });
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