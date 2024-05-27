import React, { useState } from 'react';
import axios from 'axios';
import { Container, Typography, TextField, Button } from '@mui/material';

const OutpassStatus = () => {
  const [name, setName] = useState('');
  const [outpass, setOutpass] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Function to handle fetching outpass status by name
  const fetchOutpassStatusByName = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:5000/api/outpass/${name}`);
      setOutpass(response.data);
      setError(''); // Clear any previous error
    } catch (error) {
      console.error('Error fetching outpass status:', error);
      setError('Failed to fetch outpass status. Please try again.'); // Set error message
    } finally {
      setLoading(false);
    }
  };

  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    fetchOutpassStatusByName();
  };

  return (
    <Container component="main" maxWidth="md">
      <div style={styles.paper}>
        <Typography component="h1" variant="h5" gutterBottom style={{ color: '#333' }}>
          Check Outpass Status
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
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            style={styles.submitButton}
            disabled={!name || loading}
          >
            {loading ? 'Loading...' : 'Check Status'}
          </Button>
        </form>
        {error && <Typography color="error" variant="body1">{error}</Typography>}
        {outpass && (
          <div style={{ marginTop: '20px' }}>
            <Typography variant="subtitle1" gutterBottom style={{ color: '#333' }}><strong>Name:</strong> {outpass.name}</Typography>
            <Typography variant="subtitle1" gutterBottom style={{ color: '#333' }}><strong>Reason:</strong> {outpass.reason}</Typography>
            <Typography variant="subtitle1" gutterBottom style={{ color: '#333' }}><strong>Status:</strong> {outpass.status}</Typography>
          </div>
        )}
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

export default OutpassStatus;
