import { useState } from 'react'

import './App.css'
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import LoginPage from './components/account/login'
import SignUpPage from './components/account/signup'
import StudentPage from './components/account/studentpage'
import TeacherPage from './components/account/teacherpage'

function App() {
  const [count, setCount] = useState(0)

  return (
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/student" element={<StudentPage/>}/>
        <Route path="/teacher" element={<TeacherPage/>}/>
        </Routes>
      </BrowserRouter>
  )
}

export default App
