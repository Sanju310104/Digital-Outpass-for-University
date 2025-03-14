import React from 'react';
import { AppBar, Toolbar, Typography, Button, Container, Box } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';

const TeacherHomePage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div style={styles.pageContainer}>
     <AppBar position="fixed" sx={{ backgroundColor: '#3f51b5' }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Typography variant="h6">Teacher Dashboard</Typography>
          <div>
            <Button color="inherit" onClick={() => navigate('/teacherhome')} sx={{ marginLeft: 2 }}>Home</Button>
            <Button color="inherit" onClick={() => navigate('/outpass-requests')} sx={{ marginLeft: 2 }}>Outpass Requests</Button>
            <Button color="inherit" onClick={() => navigate('/outpass-history')} sx={{ marginLeft: 2 }}>Outpass History</Button>
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
