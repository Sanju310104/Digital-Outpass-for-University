import React, { useState } from 'react';
import axios from 'axios';
import { Button, TextField, Typography, Box, Paper } from '@mui/material';

const SecurityPage = () => {
  const [rollNumber, setRollNumber] = useState('');
  const [enteredKey, setEnteredKey] = useState('');
  const [message, setMessage] = useState('');

  const handleVerification = async (e) => {
    e.preventDefault();

    if (!rollNumber || !enteredKey) {
      setMessage('⚠ Please provide both roll number and key.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/verifyKey', {
        roll_number: rollNumber,
        entered_key: enteredKey,
      });

      setMessage(response.data.message || '✅ Verification successful!');
    } catch (error) {
      setMessage(error.response?.data.message || '❌ Server error. Try again.');
    }
  };

  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'linear-gradient(135deg, #ff6b6b, #ff8e53, #ffa726, #ffcc33)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        overflow: 'hidden',
        position: 'fixed',
        top: 0,
        left: 0,
      }}
    >
      <Paper
        elevation={10}
        sx={{
          width: '90%',
          maxWidth: '400px',
          padding: '30px',
          borderRadius: '20px',
          textAlign: 'center',
          backdropFilter: 'blur(10px)',
          background: 'rgba(255, 255, 255, 0.2)',
          boxShadow: '0px 4px 30px rgba(0, 0, 0, 0.2)',
          color: '#fff',
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
          🔒 Outpass Verification
        </Typography>
        <form onSubmit={handleVerification}>
          <TextField
            fullWidth
            label="Roll Number"
            variant="outlined"
            margin="normal"
            value={rollNumber}
            onChange={(e) => setRollNumber(e.target.value)}
            required
            sx={{
              background: '#fff',
              borderRadius: '10px',
            }}
          />
          <TextField
            fullWidth
            label="Enter Key"
            variant="outlined"
            margin="normal"
            value={enteredKey}
            onChange={(e) => setEnteredKey(e.target.value)}
            required
            sx={{
              background: '#fff',
              borderRadius: '10px',
            }}
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              marginTop: '20px',
              backgroundColor: '#007BFF',
              padding: '12px',
              fontSize: '16px',
              borderRadius: '10px',
              '&:hover': { backgroundColor: '#0056b3' },
            }}
          >
            ✅ Verify
          </Button>
        </form>

        {message && (
          <Typography
            sx={{
              marginTop: '20px',
              fontWeight: 'bold',
              color: message.includes('❌') ? 'red' : 'black',
            }}
          >
            {message}
          </Typography>
        )}
      </Paper>

      {/* Guaranteed fix for full screen and no scrolling */}
      <style>
        {`
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          html, body {
            width: 100vw;
            height: 100vh;
            overflow: hidden;
          }
        `}
      </style>
    </Box>
  );
};

export default SecurityPage;
