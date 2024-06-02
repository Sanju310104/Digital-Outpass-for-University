import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TeacherPage = () => {
  const [outpasses, setOutpasses] = useState([]);
  const [students, setStudents] = useState({}); // State to store student details

  useEffect(() => {
    fetchOutpasses();
  }, []);

  useEffect(() => {
    // Save outpasses to localStorage when it changes
    localStorage.setItem('outpasses', JSON.stringify(outpasses));
  }, [outpasses]);

  useEffect(() => {
    // Load outpasses from localStorage on component mount
    const storedOutpasses = localStorage.getItem('outpasses');
    if (storedOutpasses) {
      setOutpasses(JSON.parse(storedOutpasses));
    }
  }, []);

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
      const response = await axios.get(`http://localhost:5000/api/Student`, {
        params: { roll_number }
      });
      const studentDetails = response.data;

      // Update student details in state
      setStudents(prevStudents => ({
        ...prevStudents,
        [roll_number]: studentDetails
      }));
    } catch (error) {
      console.error('Error fetching student details:', error);
    }
  };

  const approveOutpass = async (id, roll_number) => {
    try {
      await axios.put(`http://localhost:5000/api/outpass/${id}`, { status: 'Approved' });
      setOutpasses(outpasses.filter(outpass => outpass._id !== id)); // Remove approved outpass from state
      fetchOutpasses(); // Optionally, fetch updated list of outpasses after approval
    } catch (error) {
      console.error('Error approving outpass:', error);
    }
  };

  const rejectOutpass = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/outpass/${id}`, { status: 'Rejected' });
      setOutpasses(outpasses.filter(outpass => outpass._id !== id)); // Remove rejected outpass from state
    } catch (error) {
      console.error('Error rejecting outpass:', error);
    }
  };

  return (
    <div>
      <h2>Teacher's Page - Outpass Applications</h2>
      {outpasses.length === 0 ? (
        <p>No pending outpass applications.</p>
      ) : (
        outpasses.map(outpass => (
          <div key={outpass._id} style={{ marginBottom: '20px', padding: '10px', border: '1px solid #ccc' }}>
            <p><strong>Roll Number:</strong> {outpass.roll_number}</p>
            <p><strong>Reason:</strong> {outpass.reason}</p>
            <p><strong>Status:</strong> {outpass.status}</p>
            {outpass.status === 'Pending' && (
              <div>
                {/* Display student details if already fetched */}
                {students[outpass.roll_number] ? (
                  <div>
                    <p><strong>Student Name:</strong> {students[outpass.roll_number].name}</p>
                    <p><strong>Student Roll Number:</strong> {students[outpass.roll_number].roll_number}</p>
                    <p><strong>Student Email:</strong> {students[outpass.roll_number].email}</p>
                    <p><strong>Student Phone Number:</strong> {students[outpass.roll_number].phone_number}</p>
                  </div>
                ) : (
                  <button onClick={() => fetchStudentDetails(outpass.roll_number)}>Fetch Student Details</button>
                )}
                <button onClick={() => approveOutpass(outpass._id, outpass.roll_number)}>Approve</button>
                <button onClick={() => rejectOutpass(outpass._id)} style={{ marginLeft: '10px' }}>Reject</button>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default TeacherPage;
