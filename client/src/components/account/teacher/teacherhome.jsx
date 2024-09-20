import React from 'react';
import { AppBar, Toolbar, Typography, Button, Container, Box } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';

const TeacherHomePage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div style={styles.pageContainer}>
      {/* Navbar fixed at the top */}
      <AppBar position="fixed" sx={{ backgroundColor: '#3f51b5' }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Typography variant="h6">
            Teacher Dashboard
          </Typography>

          {/* Button Container */}
          <div>
            {/* Home button (disabled if on home page) */}
            <Button 
              color="inherit" 
              onClick={() => location.pathname !== '/' && navigate('/')}
              disabled={location.pathname === '/teacherhome'}
              sx={{ marginLeft: 2 }} // Add space between buttons
            >
              Home
            </Button>

            {/* Outpass Requests button */}
            <Button 
              color="inherit" 
              onClick={() => location.pathname !== '/outpass-requests' && navigate('/outpass-requests')}
              disabled={location.pathname === '/outpass-requests'}
              sx={{ marginLeft: 2 }} // Add space between buttons
            >
              Outpass Requests
            </Button>

            {/* Outpass History button */}
            <Button 
              color="inherit" 
              onClick={() => location.pathname !== '/outpass-history' && navigate('/outpass-history')}
              disabled={location.pathname === '/outpass-history'}
              sx={{ marginLeft: 2 }} // Add space between buttons
            >
              Outpass History
            </Button>
          </div>
        </Toolbar>
      </AppBar>

      {/* Adding padding to the content to account for the fixed navbar */}
      <Container style={{ paddingTop: '80px' }}>
        <Box mt={4} sx={{ color: '#fff', textAlign: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)', padding: '20px', borderRadius: '8px' }}>
          <Typography variant="h4" gutterBottom>
            Welcome to the Teacher Dashboard!
          </Typography>
          <Typography variant="body1" paragraph>
            This is the home page where you can access the outpass requests, view the history of outpasses, and manage student details.
          </Typography>
          <Typography variant="body1" paragraph>
            Use the navigation buttons in the header to move between different sections.
          </Typography>
        </Box>
      </Container>
    </div>
  );
};

const styles = {
  pageContainer: {
    backgroundImage: 'url("https://cdn.wallpapersafari.com/42/59/MV7c4e.jpg")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    display: 'flex',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100vh',
  },
};

export default TeacherHomePage;
