import { useState } from 'react'

import './App.css'
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import LoginPage from './components/account/login'
import SignUpPage from './components/account/signup'
import StudentPage from './components/account/student/studentpage'
import  TeacherPage from './components/account/teacher/teacherpage'
import ApplyOutpassPage from './components/account/student/applyoutpass'
import OutpassStatus from './components/account/student/checkstatus'
import { UserProvider } from './components/account/usercontext';
import TeacherHomePage from './components/account/teacher/teacherhome'
import OutpassHistoryPage from './components/account/teacher/outpasshistory'
import SecurityPage from './components/account/Security/securitypage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/student" element={<StudentPage/>}/>
        <Route path="/outpass-requests" element={<TeacherPage/>}/>
        <Route path="/apply-outpass" element={<ApplyOutpassPage/>}/>
        <Route path="/check-outpass-status" element={<OutpassStatus/>}/>
        <Route path="/teacherhome" element={<TeacherHomePage/>}/>
        <Route path="/outpass-history" element={<OutpassHistoryPage/>}/>
        <Route path="/securitydashboard" element={<SecurityPage/>}/>
        </Routes>
      </BrowserRouter>
    </UserProvider>
  )
}

export default App
