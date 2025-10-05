import mongoose from 'mongoose';

const skillSchema = new mongoose.Schema({
  category: String,
  name: String,
  progress: {
    type: Number,
    default: 0,
  },
});

export default mongoose.model('Skill', skillSchema);
