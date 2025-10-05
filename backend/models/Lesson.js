import mongoose from 'mongoose';

const lessonSchema = new mongoose.Schema({
  category: String,
  skill: String,
  title: String,
  link: String,
  note: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('Lesson', lessonSchema);
