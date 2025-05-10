import mongoose, { model, Schema } from 'mongoose';

const sessionSchema = new Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    role: { type: String, required: true },
    experience: { type: String, required: true },
    topicToFocus: { type: String, required: true },
    descriptions: String,
    questions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question',
      },
    ],
  },
  {
    timestamps: true,
  },
);

const SessionModel = model('Session', sessionSchema);

export default SessionModel;
