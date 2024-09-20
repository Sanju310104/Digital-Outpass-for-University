require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const cron = require('node-cron');
const Student = require('./model/Student.js');
const Teacher = require('./model/Teacher.js');
const Outpass = require('./model/outpass.js');

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

// Middleware function to verify JWT token and role
function verifyTokenAndRole(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Authorization token not provided' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    // Check if the role is 'teacher'
    if (decoded.role !== 'teacher') {
      return res.status(403).json({ message: 'Unauthorized access' });
    }

    // Attach user information to request object for further use if needed
    req.user = decoded;

    next(); // Move to next middleware or route handler
  });
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
    res.json({ token, role: 'student', roll_number: student.roll_number });
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
    res.json({ token, role: 'teacher', roll_number: teacher.roll_number });
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

app.get('/api/outpass/:roll_number', async (req, res) => {
  const roll_number = req.params.roll_number;

  try {
    const outpass = await Outpass.findOne({ roll_number });
    if (!outpass) {
      return res.status(404).json({ message: 'Outpass not found' });
    }
    res.json(outpass);
  } catch (error) {
    console.error('Error fetching outpass:', error);
    res.status(500).json({ message: 'Server error' });
  }
});


app.get('/api/outpass/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const outpass = await Outpass.findOne({ _id: id, status: 'Pending' });
    if (!outpass) {
      return res.status(404).json({ message: 'Outpass not found or not pending' });
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
  const { roll_number, reason } = req.body;

  try {
    const newOutpass = new Outpass({ roll_number, reason, status: 'Pending' });
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

// Example backend route to fetch student details by roll_number
app.get('/api/Student', async (req, res) => {
  const { roll_number } = req.query;

  try {
    // Query the database or perform necessary logic to fetch student details
    const student = await Student.findOne({ roll_number }); // Example using Mongoose

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    // Respond with student details
    res.json(student);
  } catch (error) {
    console.error('Error fetching student details:', error);
    res.status(500).json({ message: 'Server error' });
  }
});
// Get teacher approval count
app.get('/api/teachers/:roll_number', async (req, res) => {
  try {
    const teacher = await Teacher.findOne({ roll_number: req.params.roll_number });

    if (!teacher) {
      return res.status(404).send('Teacher not found');
    }

    res.status(200).json({ approvedCount: teacher.approvedCount });
  } catch (error) {
    console.error('Error fetching teacher approval count:', error);
    res.status(500).send('Error fetching approval count');
  }
});

// Update teacher approval count
app.put('/api/teachers/:roll_number', async (req, res) => {
  try {
    const { approvedCount } = req.body;

    // Check if approvedCount is valid
    if (typeof approvedCount !== 'number' || approvedCount < 0) {
      return res.status(400).send('Invalid approval count');
    }

    const result = await Teacher.updateOne(
      { roll_number: req.params.roll_number },
      { approvedCount }
    );

    if (result.nModified === 0) {
      return res.status(404).send('Teacher not found or count not updated');
    }

    res.status(200).send('Approval count updated successfully');
  } catch (error) {
    console.error('Error updating approval count:', error);
    res.status(500).send('Error updating approval count');
  }
});

