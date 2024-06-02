import React, { useState } from 'react';
import axios from 'axios';
import { Container, Typography, Button } from '@mui/material';
import { useUser } from '../usercontext'; // Assuming you have a user context for authentication

const OutpassStatus = () => {
  const { user } = useUser(); // Get the logged-in user from context
  const [outpass, setOutpass] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Function to handle fetching outpass status by roll_number
  const fetchOutpassStatusByRollNumber = async (roll_number) => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:5000/api/outpass/${roll_number}`);
      setOutpass(response.data);
      setError(''); // Clear any previous error
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setError('Outpass not found for this roll number'); // Set specific error message for 404
      } else {
        console.error('Error fetching outpass status:', error);
        setError('Failed to fetch outpass status. Please try again.'); // Set generic error message
      }
    } finally {
      setLoading(false);
    }
  };

  // Function to handle button click
  const handleButtonClick = () => {
    if (user) {
      fetchOutpassStatusByRollNumber(user.rollNumber); // Fetch outpass status for logged-in user
    } else {
      setError('User not logged in.'); // Handle case where user is not logged in
    }
  };

  return (
    <Container component="main" maxWidth="md">
      <div style={styles.paper}>
        <Typography component="h1" variant="h5" gutterBottom style={{ color: '#333' }}>
          Check Outpass Status
        </Typography>
        <Button
          onClick={handleButtonClick}
          variant="contained"
          color="primary"
          fullWidth
          style={styles.submitButton}
          disabled={!user || loading}
        >
          {loading ? 'Loading...' : 'Check Status'}
        </Button>
        {error && <Typography color="error" variant="body1">{error}</Typography>}
        {outpass && (
          <div style={{ marginTop: '20px' }}>
            <Typography variant="subtitle1" gutterBottom style={{ color: '#333' }}><strong>roll_number:</strong> {outpass.roll_number}</Typography>
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
  submitButton: {
    marginTop: 24,
  },
};

export default OutpassStatus;
