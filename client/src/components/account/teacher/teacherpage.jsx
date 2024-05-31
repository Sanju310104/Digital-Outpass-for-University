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

  const approveOutpass = async (id, name) => {
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
            <p><strong>Name:</strong> {outpass.name}</p>
            <p><strong>Reason:</strong> {outpass.reason}</p>
            <p><strong>Status:</strong> {outpass.status}</p>
            {outpass.status === 'Pending' && (
              <div>
                {/* Display student details if already fetched */}
                {students[outpass.name] ? (
                  <div>
                    <p><strong>Student Name:</strong> {students[outpass.name].name}</p>
                    <p><strong>Student Roll Number:</strong> {students[outpass.name].roll_number}</p>
                    <p><strong>Student Email:</strong> {students[outpass.name].email}</p>
                    <p><strong>phn_number:</strong> {students[outpass.name].phone_number}</p>
                  </div>
                ) : (
                  <button onClick={() => fetchStudentDetails(outpass.name)}>Fetch Student Details</button>
                )}
                <button onClick={() => approveOutpass(outpass._id, outpass.name)}>Approve</button>
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
