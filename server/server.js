require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const cron = require('node-cron');
const Student = require('./model/Student.js');
const Teacher = require('./model/Teacher.js');
const Outpass = require('./model/Outpass.js');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log('MongoDB connection error:', err));

// Token generation function
function generateToken(userId, role) {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined');
  }
  return jwt.sign({ userId, role }, process.env.JWT_SECRET, { expiresIn: '1h' });
}

// Student Login
app.post('/api/Student', async (req, res) => {
  const { roll_number, password } = req.body;

  try {
    console.log('Received student login request:', roll_number);

    // Find the student by roll_number
    const student = await Student.findOne({ roll_number });

    if (!student) {
      console.log('Student not found:', roll_number);
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Compare hashed password
    const isPasswordValid = (password === student.password); // Assuming password is predefined

    if (!isPasswordValid) {
      console.log('Invalid password for student:', roll_number);
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Generate a token
    const token = generateToken(student._id, 'student');

    console.log('Student logged in successfully:', roll_number);
    res.json({ token, role: 'student' });
  } catch (error) {
    console.error('Student login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Teacher Login
app.post('/api/Teacher', async (req, res) => {
  const { roll_number, password } = req.body;

  try {
    console.log('Received teacher login request:', roll_number);

    // Find the teacher by roll_number
    const teacher = await Teacher.findOne({ roll_number });

    if (!teacher) {
      console.log('Teacher not found:', roll_number);
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Compare hashed password
    const isPasswordValid = (password === teacher.password); // Assuming password is predefined

    if (!isPasswordValid) {
      console.log('Invalid password for teacher:', roll_number);
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Generate a token
    const token = generateToken(teacher._id, 'teacher');

    console.log('Teacher logged in successfully:', roll_number);
    res.json({ token, role: 'teacher' });
  } catch (error) {
    console.error('Teacher login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Outpass cleanup function
const cleanupOutpasses = async () => {
  try {
    const oneMinuteAgo = new Date(Date.now() - 60 * 1000);
    const oldOutpasses = await Outpass.find({ createdAt: { $lt: oneMinuteAgo } });

    for (const outpass of oldOutpasses) {
      await Outpass.findByIdAndDelete(outpass._id);
      console.log(`Outpass request deleted: ${outpass._id}`);
    }
  } catch (error) {
    console.error('Error deleting old outpass requests:', error);
  }
};

// Schedule the cleanup task to run every minute
cron.schedule('* * * * *', () => {
  cleanupOutpasses().catch((error) => {
    console.error('Error with cleanup task:', error);
  });
});

// Routes for Outpasses
app.get('/api/outpass', async (req, res) => {
  try {
    const outpasses = await Outpass.find();
    res.json(outpasses);
  } catch (err) {
    console.error('Error fetching outpasses:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

app.get('/api/outpass/:name', async (req, res) => {
  const { name } = req.params;

  try {
    const outpass = await Outpass.findOne({ name });
    if (!outpass) {
      return res.status(404).json({ message: 'Outpass not found' });
    }
    res.json(outpass);
  } catch (error) {
    console.error('Error fetching outpass:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.get('/api/outpass/id/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const outpass = await Outpass.findById(id);
    if (!outpass) {
      return res.status(404).json({ message: 'Outpass not found' });
    }
    res.json(outpass);
  } catch (err) {
    console.error('Error fetching outpass:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

app.put('/api/outpass/:id', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const outpass = await Outpass.findById(id);
    if (!outpass) {
      return res.status(404).json({ message: 'Outpass not found' });
    }
    outpass.status = status;
    await outpass.save();
    res.json(outpass);
  } catch (err) {
    console.error('Error updating outpass status:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/api/outpass', async (req, res) => {
  const { name, reason } = req.body;

  try {
    const newOutpass = new Outpass({ name, reason, status: 'Pending' });
    await newOutpass.save();
    res.json(newOutpass);
  } catch (err) {
    console.error('Error creating outpass:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
