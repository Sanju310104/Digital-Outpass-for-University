import React, { useState } from 'react';
import { Container, CssBaseline, Typography, TextField, Button, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();

    if (!username || !password) {
      alert('Username and password are required');
      return;
    }

    try {
      // Determine if the username is a roll number or employee ID
      const isStudent = username.startsWith('2'); // Assuming roll numbers start with '2' for students

      let response;
      if (isStudent) {
        response = await axios.post('http://localhost:5000/api/Student', {
          roll_number: username,
          password,
          isStudent // Send a flag indicating if it's a student login
        });
      } else {
        response = await axios.post('http://localhost:5000/api/Teacher', {
          roll_number: username,
          password
        });
      }
      console.log('Login response:', response.data); // Log the entire response for debugging

      // Assuming backend returns a token upon successful login
      const { token, role } = response.data;

      // Store the token securely (considerations apply, see notes)
      localStorage.setItem('token', token);

      // Redirect based on user role
      if (role === 'student') {
        navigate('/student'); // Redirect to student page
      } else if (role === 'teacher') {
        navigate('/teacher'); // Redirect to teacher page
      } else {
        alert('Invalid role'); // Handle unexpected role
      }
    } catch (error) {
      console.error('Login failed:', error);
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        alert(error.response.data.message);
      } else if (error.request) {
        // The request was made but no response was received
        alert('Server is not responding');
      } else {
        // Something happened in setting up the request that triggered an Error
        alert('Error: ' + error.message);
      }
    }
  };

  return (
    <div style={styles.background}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div style={styles.paper}>
          <Typography component="h1" variant="h5" style={styles.welcomeText}>
            WELCOME - VNRVJIET
          </Typography>
          <form style={styles.form} noValidate onSubmit={handleLogin}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="User Name (Roll Number or Employee ID)"
              name="username"
              autoComplete="username"
              autoFocus
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              style={styles.submit}
            >
              Log In
            </Button>
          </form>

          <Typography variant="body2" align="center">
            Don't have an account?{' '}
            <Link to="/signup" color="primary">
              Sign Up
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
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: '100vh',
    display: 'flex',
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
};

export default LoginPage;
