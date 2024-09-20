import React, { useState } from 'react';
import { Container, CssBaseline, Typography, TextField, Button, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useUser } from './usercontext';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { setUser } = useUser(); // Get setUser from UserContext
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();

    if (!username || !password) {
      alert('Username and password are required');
      return;
    }

    try {
      const isStudent = username.startsWith('2'); // Assuming roll numbers start with '2' for students

      let response;
      if (isStudent) {
        response = await axios.post('http://localhost:5000/api/Student', {
          roll_number: username,
          password,
        });
      } else {
        response = await axios.post('http://localhost:5000/api/Teacher', {
          roll_number: username,
          password,
        });
      }

      console.log('Login response:', response.data);

      const { token, role } = response.data;
      localStorage.setItem('token', token);

      setUser({ rollNumber: username, role }); // Set user context

      if (role === 'student') {
        navigate('/student'); // Redirect to student page
      } else if (role === 'teacher') {
        navigate('/teacherhome'); // Redirect to teacher page
      } else {
        alert('Invalid role'); // Handle unexpected role
      }
    } catch (error) {
      console.error('Login failed:', error);
      if (error.response) {
        alert(error.response.data.message);
      } else if (error.request) {
        alert('Server is not responding');
      } else {
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
};

export default LoginPage;
