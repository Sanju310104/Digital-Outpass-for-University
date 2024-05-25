import React from 'react';
import { Container, CssBaseline, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

function StudentPage() {
  return (
    <Container component="main" maxWidth="md">
      <CssBaseline />
      <div style={styles.paper}>
        <Typography component="h1" variant="h5" style={styles.welcomeText}>
          Welcome, Student!
        </Typography>
        <Typography component="p" style={styles.infoText}>
          This is the student dashboard where you can find all the resources and information you need.
        </Typography>
        <Button variant="contained" color="primary" style={styles.button}>
          <Link to="/" style={styles.link}>Go to Home</Link>
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
  welcomeText: {
    marginBottom: 16,
  },
  infoText: {
    marginBottom: 32,
    textAlign: 'center',
  },
  button: {
    marginTop: 24,
  },
  link: {
    color: 'white',
    textDecoration: 'none',
  },
};

export default StudentPage;
