import mongoose from 'mongoose';

const lessonSchema = new mongoose.Schema(
  {
    category: { type: String, required: true },
    skill: { type: String, required: true },
    title: { type: String, required: true },
    note: { type: String },
    link: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model('Lesson', lessonSchema);
