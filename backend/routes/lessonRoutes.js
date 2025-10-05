import express from 'express';
import Lesson from '../models/lessonModel.js';

const router = express.Router();

// Get all lessons
router.get('/', async (req, res) => {
  try {
    const lessons = await Lesson.find();
    res.json(lessons);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get lessons by category and skill
router.get('/:category/:skill', async (req, res) => {
  try {
    const { category, skill } = req.params;
    const lessons = await Lesson.find({ category, skill });
    res.json(lessons);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add new lesson
router.post('/', async (req, res) => {
  try {
    const lesson = new Lesson(req.body);
    const saved = await lesson.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete lesson
router.delete('/:id', async (req, res) => {
  try {
    await Lesson.findByIdAndDelete(req.params.id);
    res.json({ message: 'Lesson deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
