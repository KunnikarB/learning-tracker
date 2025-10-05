import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import lessonsRoutes from './routes/lessonRoutes.js';
import skillsRoutes from './routes/skillsRoutes.js';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Connect MongoDB
connectDB();

// Routes
app.use('/api/lessons', lessonsRoutes);
app.use('/api/skills', skillsRoutes);

// Root endpoint
app.get('/', (req, res) => {
  res.send('🎓 Learning Tracker Backend is Running!');
});

// Start server
const PORT = process.env.PORT || 5500;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
