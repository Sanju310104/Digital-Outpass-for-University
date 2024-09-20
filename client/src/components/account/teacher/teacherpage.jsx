import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Button, Container, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const TeacherPage = () => {
  const [outpasses, setOutpasses] = useState([]);
  const [students, setStudents] = useState({});
  const [approvedCount, setApprovedCount] = useState(0);
  const [buttonsDisabled, setButtonsDisabled] = useState(false);
  const [rejectButtonsDisabled, setRejectButtonsDisabled] = useState(false);
  const navigate = useNavigate();

  // Retrieve the logged-in teacher's username
  const username = localStorage.getItem('username');

  useEffect(() => {
    const storedApprovedCount = Number(localStorage.getItem(`approvedCount_${username}`)) || 0;
    setApprovedCount(storedApprovedCount);
    const isDisabled = storedApprovedCount >= 3;
    setButtonsDisabled(isDisabled);
    setRejectButtonsDisabled(isDisabled); // Disable reject button if count is at max
    fetchOutpasses();

    // Reset approved count after 1 minute
    const timer = setTimeout(() => {
      setApprovedCount(0);
      localStorage.setItem(`approvedCount_${username}`, 0); // Reset in local storage
      setButtonsDisabled(false);
      setRejectButtonsDisabled(false);
    }, 60000); // 60000 milliseconds = 1 minute

    // Cleanup the timeout on component unmount or if approvedCount changes
    return () => clearTimeout(timer);
  }, [username]);

  const fetchOutpasses = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/outpass', { params: { status: 'Pending' } });
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

  const approveOutpass = async (id) => {
    if (approvedCount < 3) {
      try {
        await axios.put(`http://localhost:5000/api/outpass/${id}`, { status: 'Approved' });
        const newCount = approvedCount + 1; // Increment approved count
        setApprovedCount(newCount);
        localStorage.setItem(`approvedCount_${username}`, newCount); // Store updated count with unique key
        setButtonsDisabled(newCount >= 3);
        setRejectButtonsDisabled(newCount >= 3); // Disable reject button if count is at max
        setOutpasses(outpasses.filter(outpass => outpass._id !== id)); // Remove approved outpass from UI
      } catch (error) {
        console.error('Error approving outpass:', error);
      }
    }
  };

  const rejectOutpass = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/outpass/${id}`, { status: 'Rejected' });
      setOutpasses(outpasses.filter(outpass => outpass._id !== id));
    } catch (error) {
      console.error('Error rejecting outpass:', error);
    }
  };

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

      <Container>
        <Box mt={10} sx={{ color: '#fff', textAlign: 'center' }}>
          <h2>Teacher's Page - Outpass Applications</h2>
          <p>Approved Outpass Count: {approvedCount} / 3</p>
          {outpasses.length === 0 ? (
            <p>No pending outpass applications.</p>
          ) : (
            outpasses
              .filter(outpass => outpass.status === 'Pending') // Ensure only pending outpasses are displayed
              .map(outpass => (
                <div key={outpass._id} style={styles.outpassCard}>
                  <p><strong>Roll Number:</strong> {outpass.roll_number}</p>
                  <p><strong>Reason:</strong> {outpass.reason}</p>
                  <p><strong>Status:</strong> {outpass.status}</p>
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
                  <Button onClick={() => approveOutpass(outpass._id)} variant="contained" color="primary" disabled={buttonsDisabled}>
                    Approve
                  </Button>
                  <Button onClick={() => rejectOutpass(outpass._id)} variant="contained" color="secondary" style={{ marginLeft: '10px' }} disabled={rejectButtonsDisabled}>
                    Reject
                  </Button>
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  outpassCard: {
    marginBottom: '20px',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    color: '#000',
  },
};

export default TeacherPage;
