import express from 'express';
import {
  getSkills,
  updateSkillProgress,
} from '../controllers/skillsController.js';

const router = express.Router();

router.get('/', getSkills);
router.post('/', updateSkillProgress);

export default router;
