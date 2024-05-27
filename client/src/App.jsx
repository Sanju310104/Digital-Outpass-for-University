import { useState } from 'react'

import './App.css'
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import LoginPage from './components/account/login'
import SignUpPage from './components/account/signup'
import StudentPage from './components/account/student/studentpage'
import  TeacherPage from './components/account/teacher/teacherpage'
import ApplyOutpassPage from './components/account/student/applyoutpass'
import OutpassStatus from './components/account/student/checkstatus'

function App() {
  const [count, setCount] = useState(0)

  return (
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/student" element={<StudentPage/>}/>
        <Route path="/teacher" element={<TeacherPage/>}/>
        <Route path="/apply-outpass" element={<ApplyOutpassPage/>}/>
        <Route path="/check-outpass-status" element={<OutpassStatus/>}/>
        </Routes>
      </BrowserRouter>
  )
}

export default App
