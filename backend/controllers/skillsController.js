import Skill from '../models/Skill.js';

export const getSkills = async (req, res) => {
  try {
    const skills = await Skill.find();
    res.json(skills);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateSkillProgress = async (req, res) => {
  try {
    const { category, name, progress } = req.body;
    let skill = await Skill.findOne({ category, name });
    if (!skill) skill = await Skill.create({ category, name, progress });
    else skill.progress = progress;
    await skill.save();
    res.json(skill);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
