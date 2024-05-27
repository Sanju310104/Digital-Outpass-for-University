import React, { useState } from 'react';
import axios from 'axios';
import { Container, CssBaseline, Typography, TextField, Button } from '@mui/material';

const ApplyOutpassPage = () => {
  const [name, setName] = useState('');
  const [reason, setReason] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/outpass', { name, reason });
      console.log('Outpass application submitted:', response.data);
      // Optionally, you can redirect or show a success message here
    } catch (error) {
      console.error('Error submitting outpass application:', error);
    }
  };

  return (
    <Container component="main" maxWidth="md">
      <CssBaseline />
      <div style={styles.paper}>
        <Typography component="h1" variant="h5">
          Apply for Outpass
        </Typography>
        <form onSubmit={handleSubmit} style={styles.form}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="name"
            label="Your Name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="reason"
            label="Reason for Leaving"
            name="reason"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            style={styles.submitButton}
          >
            Submit Application
          </Button>
        </form>
      </div>
    </Container>
  );
};

const styles = {
  paper: {
    marginTop: 32,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 8,
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
  },
  form: {
    width: '100%',
    marginTop: 16,
  },
  submitButton: {
    marginTop: 24,
  },
};

export default ApplyOutpassPage;
