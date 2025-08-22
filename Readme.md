# Digital Outpass System

## Overview
The **Digital Outpass System** is a MERN stack-based web application that automates outpass requests in educational institutions. It streamlines the process for students, teachers, and security personnel, ensuring secure and efficient approvals with QR-based verification.

## Features

### Student Portal
- **Login/Register** as a student.
- **Apply for an outpass** request with reason and timing.
- **Check application status** (Pending, Approved, Rejected).
- **Receive a QR code** upon approval, containing a unique key for verification at the security checkpoint.

### Teacher Portal
- **Login as a teacher**.
- **View all pending requests** from students.
- **Approve or Reject** outpass requests.

### Security Portal
- **Login as security personnel**.
- **Scan the QR code** provided by the student.
- **Verify the key** to allow or deny exit.

## Tech Stack
- **Frontend**: React.js, React Router, Material-UI (MUI)
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Libraries**: Axios, QRCode.react, Mongoose
- **Authentication**: JSON Web Token (JWT)

## Installation & Setup

1. Clone the repository:
   ```sh
   git clone https://github.com/Sanju310104/Digital-Outpass-for-University.git
   cd DigitalOutpass
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Start the backend server:
   ```sh
   cd server
   npm start
   ```

4. Start the frontend:
   ```sh
   cd client
   npm run dev
   ```

5. Open the app in your browser at `http://localhost:5173`.

## API Endpoints

### Student Routes
- `POST /api/students/login` - Student login
- `POST /api/students/apply-outpass` - Apply for an outpass
- `GET /api/students/status/:id` - Check request status

### Teacher Routes
- `POST /api/teachers/login` - Teacher login
- `GET /api/teachers/requests` - View all requests
- `PUT /api/teachers/approve/:id` - Approve an outpass
- `PUT /api/teachers/reject/:id` - Reject an outpass

### Security Routes
- `POST /api/security/login` - Security login
- `POST /api/security/verify` - Scan QR and verify key

## Future Enhancements
- **Email/SMS Notifications** for status updates.
- **Mobile App Integration** for better accessibility.

