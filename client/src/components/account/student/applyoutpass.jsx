import React, { useState } from 'react';
import { Container, CssBaseline, Typography, TextField, Button } from '@mui/material';
import { Link } from 'react-router-dom';

function ApplyOutpassPage() {
  const [reason, setReason] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here
    console.log('Submitting outpass application with reason:', reason);
    // Example: You might submit the form data to a backend API here
  };

  return (
    <Container component="main" maxWidth="md">
      <CssBaseline />
      <div style={styles.paper}>
        <Typography component="h1" variant="h5" style={styles.header}>
          Apply for Outpass
        </Typography>
        <form onSubmit={handleSubmit} style={styles.form}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="reason"
            label="Reason for leaving"
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
        <Button
          variant="contained"
          color="secondary"
          style={styles.cancelButton}
          component={Link}
          to="/student"
        >
          Cancel
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
  form: {
    width: '100%',
    marginTop: 16,
  },
  submitButton: {
    marginTop: 24,
  },
  cancelButton: {
    marginTop: 12,
  },
};

export default ApplyOutpassPage;
