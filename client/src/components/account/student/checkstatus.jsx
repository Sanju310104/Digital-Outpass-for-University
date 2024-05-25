import React, { useState, useEffect } from 'react';
import { Container, CssBaseline, Typography, CircularProgress, Button } from '@mui/material';
import { Link } from 'react-router-dom';

function CheckOutpassStatusPage() {
  const [loading, setLoading] = useState(true);
  const [outpassStatus, setOutpassStatus] = useState('Pending'); // Example: Initial status

  useEffect(() => {
    // Simulating fetching outpass status from backend (replace with actual API call)
    setTimeout(() => {
      setLoading(false);
      setOutpassStatus('Approved'); // Example: Set the actual status fetched from backend
    }, 2000); // Simulating 2 second loading delay
  }, []);

  return (
    <Container component="main" maxWidth="md">
      <CssBaseline />
      <div style={styles.paper}>
        <Typography component="h1" variant="h5" style={styles.header}>
          Check Outpass Status
        </Typography>
        {loading ? (
          <CircularProgress style={styles.loadingIndicator} />
        ) : (
          <Typography component="p" style={styles.statusText}>
            Your outpass status is: {outpassStatus}
          </Typography>
        )}
        <Button
          variant="contained"
          color="secondary"
          style={styles.button}
          component={Link}
          to="/student"
        >
          Go Back to Dashboard
        </Button>
      </div>
    </Container>
  );
}

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
  header: {
    marginBottom: 16,
  },
  loadingIndicator: {
    margin: '32px auto',
  },
  statusText: {
    marginTop: 24,
    textAlign: 'center',
  },
  button: {
    marginTop: 24,
  },
};

export default CheckOutpassStatusPage;
