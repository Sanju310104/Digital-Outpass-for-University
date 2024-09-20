import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Button, Container, Box } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const OutpassHistoryPage = () => {
  const [outpasses, setOutpasses] = useState([]);
  const [students, setStudents] = useState({});
  const navigate = useNavigate();
  const location = useLocation(); // To check the current path

  useEffect(() => {
    fetchOutpasses();
  }, []);

  const fetchOutpasses = async () => {
    try {
      // Fetch only outpasses that are 'Approved' or 'Rejected'
      const response = await axios.get('http://localhost:5000/api/outpass', { 
        params: { status: ['Approved', 'Rejected'] } 
      });
      setOutpasses(response.data);
    } catch (error) {
      console.error('Error fetching outpasses:', error);
    }
  };

  const fetchStudentDetails = async (roll_number) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/Student`, { params: { roll_number } });
      const studentDetails = response.data;
      setStudents(prevStudents => ({
        ...prevStudents,
        [roll_number]: studentDetails
      }));
    } catch (error) {
      console.error('Error fetching student details:', error);
    }
  };

  return (
    <div style={styles.pageContainer}>
      {/* Navbar */}
      <AppBar position="fixed" sx={{ backgroundColor: '#3f51b5' }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Typography variant="h6">
            Teacher Dashboard
          </Typography>
          <div>
            <Button color="inherit" onClick={() => navigate('/teacherhome')}>Home</Button>
            <Button 
              color="inherit" 
              onClick={() => location.pathname !== '/outpass-requests' && navigate('/outpass-requests')}
              disabled={location.pathname === '/outpass-requests'}
              sx={{ marginLeft: 2 }} // Add space between buttons
            >
              Outpass Requests
            </Button>
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

      {/* Content */}
      <Container style={{ paddingTop: '80px' }}>
        <Box mt={4} sx={{ color: '#fff', textAlign: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)', padding: '20px', borderRadius: '8px' }}>
          <h2>Outpass History - Approved/Rejected Applications</h2>
          {outpasses.length === 0 ? (
            <p>No approved or rejected outpass applications.</p>
          ) : (
            outpasses.map(outpass => (
              <div key={outpass._id} style={{ marginBottom: '20px', padding: '10px', border: '1px solid #ccc', backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
                <p><strong>Roll Number:</strong> {outpass.roll_number}</p>
                <p><strong>Reason:</strong> {outpass.reason}</p>
                <p><strong>Status:</strong> {outpass.status}</p>
                
                {/* Display student details if fetched */}
                {students[outpass.roll_number] ? (
                  <div>
                    <p><strong>Student Name:</strong> {students[outpass.roll_number].name}</p>
                    <p><strong>Student Roll Number:</strong> {students[outpass.roll_number].roll_number}</p>
                    <p><strong>Student Email:</strong> {students[outpass.roll_number].email}</p>
                    <p><strong>Student Phone Number:</strong> {students[outpass.roll_number].phone_number}</p>
                  </div>
                ) : (
                  <Button onClick={() => fetchStudentDetails(outpass.roll_number)}>
                    Fetch Student Details
                  </Button>
                )}
              </div>
            ))
          )}
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

export default OutpassHistoryPage;
