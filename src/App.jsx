import { Route, Routes } from 'react-router-dom'
import './App.css'
import { useState } from 'react'

import HomePage from './Pages/HomePage'
import AboutUs from './Pages/AboutUs'
import NotFound from './Pages/NotFound'
import SignUp from './Pages/SignUp'
import LogIn from './Pages/Login'
import CourseList from './Pages/Course/CourseList'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route path="" element={<HomePage />}/>
        <Route path="/about" element={< AboutUs/>}/>
        <Route path="/courses" element={<CourseList/>}/>

        <Route path='/signup' element={<SignUp />} />
        <Route path='/login' element={<LogIn />} />

        <Route path='*' element ={<NotFound />}/>
      </Routes>

    </>
  )
}

export default App
