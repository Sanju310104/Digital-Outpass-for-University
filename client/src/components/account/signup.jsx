// SignUpPage.js
import React from 'react';
import { Container, CssBaseline, Typography, TextField, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

function SignUpPage() {
  return (
    <div style={styles.background}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div style={styles.paper}>
          <Typography component="h1" variant="h5" style={styles.welcomeText}>
            Sign Up - VNRVJIET
          </Typography>
          <form style={styles.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="User Name"
              name="username"
              autoComplete="username"
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="department"
              label="Department"
              name="department"
              autoComplete="department"
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              style={styles.submit}
            >
              Sign Up
            </Button>
          </form>
          <Typography variant="body2" align="center">
            Already have an account?{' '}
            <Link to="/" style={styles.link}>
              Log In
            </Link>
          </Typography>
        </div>
        <Box mt={8}>
          <Typography variant="body2" color="textSecondary" align="center">
            {'© '}
            <Link color="inherit" href="https://material-ui.com/">
              Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
          </Typography>
        </Box>
      </Container>
    </div>
  );
}

const styles = {
  background: {
    backgroundImage: 'url(https://media.istockphoto.com/id/1501103626/photo/defocused-background-image-of-a-spacious-hallway-in-a-modern-office.webp?b=1&s=170667a&w=0&k=20&c=3HUg5TdHHWq4rmYJ7lA0Jn9koAesfCrO4lFiEaUFKuI=)',
    backgroundSize: 'cover', // Ensure the image covers the entire container
    backgroundPosition: 'center', // Center the image
    backgroundRepeat: 'no-repeat', // Prevent the image from repeating
    display: 'flex',
    position: 'absolute', // Use absolute positioning
    top: 0, // Align to the top of the viewport
    left: 0, // Align to the left of the viewport
    width: '100%', // Full width of the viewport
    height: '100vh', 
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    marginTop: 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 8,
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
  },
  welcomeText: {
    marginBottom: 16,
  },
  form: {
    width: '100%',
    marginTop: 8,
  },
  submit: {
    marginTop: 24,
    marginBottom: 16,
  },
  link: {
    textDecoration: 'none',
    color: 'blue',
    cursor: 'pointer',
  },
};

export default SignUpPage;
