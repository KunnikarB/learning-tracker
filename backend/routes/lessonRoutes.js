import express from 'express';
import {
  getLessons,
  addLesson,
  deleteLesson,
} from '../controllers/lessonsController.js';

const router = express.Router();

router.get('/', getLessons);
router.post('/', addLesson);
router.delete('/:id', deleteLesson);

export default router;
