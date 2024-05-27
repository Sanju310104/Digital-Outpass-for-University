require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Outpass = require('./model/outpass.js');



const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));
  

// Routes
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
      const outpass = await Outpass.findOne({ name }); // Assuming Outpass is your Mongoose model
      if (!outpass) {
        return res.status(404).json({ message: 'Outpass not found' });
      }
      res.json(outpass); // Return the outpass data including status
    } catch (error) {
      console.error('Error fetching outpass:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });
  

app.get('/api/outpass/:id', async (req, res) => {
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
