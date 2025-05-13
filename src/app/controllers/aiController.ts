import { GoogleGenAI } from '@google/genai';
import { conceptExplainPrompt, questionAnswerPrompt } from '../utils/prompts';
import config from '../config';

const ai = new GoogleGenAI({ apiKey: config.gemini_api_key });

const generateInterviewQuestions = async (req, res) => {
  try {
    const { role, experience, topicsToFocus, numberOfQuestions } = req.body;
    if (!role || !experience || !topicsToFocus || !numberOfQuestions) {
      return res.status(400).json({ message: 'missing required fields' });
    }
    const prompt = questionAnswerPrompt(
      role,
      experience,
      topicsToFocus,
      numberOfQuestions,
    );

    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash-lite',
      contents: prompt,
    });
    let rawText = response.text;
    const cleanText = rawText
      ?.replace(/^```json\s*/, '')
      .replace(/```$/, '')
      .trim();

    const data = JSON.parse(cleanText);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      message: 'Failed to generate questions',
      error: error.message,
    });
  }
};

const generateConceptExplanation = async (req, res) => {
  try {
    const { question } = req.body;

    if (!question) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const prompt = conceptExplainPrompt(question);

    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash-lite',
      contents: prompt,
    });

    let rawText = response.text;
    const cleanText = rawText
      ?.replace(/^```json\s*/, '')
      .replace(/```$/, '')
      .trim();

    const data = JSON.parse(cleanText);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      message: 'Failed to generate questions',
      error: error.message,
    });
  }
};

export const AiController = {
  generateInterviewQuestions,
  generateConceptExplanation,
};
