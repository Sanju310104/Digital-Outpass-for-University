import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TeacherPage = () => {
  const [outpasses, setOutpasses] = useState([]);

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

  const approveOutpass = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/outpass/${id}`, { status: 'Approved' });
      setOutpasses(outpasses.filter(outpass => outpass._id !== id)); // Remove approved outpass from state
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
                <button onClick={() => approveOutpass(outpass._id)}>Approve</button>
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
