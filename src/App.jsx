import { Route, Routes } from 'react-router-dom'
import './App.css'
import { useState } from 'react'

import HomePage from './Pages/HomePage'
import AboutUs from './Pages/AboutUs'
import NotFound from './Pages/NotFound'
import SignUp from './Pages/SignUp'
import LogIn from './Pages/Login'
import CourseList from './Pages/Course/CourseList'
import Contact from './Pages/Contact'
import Denied from './Pages/Denied'
import CourseDescription from './Pages/Course/CourseDescription'
import RequireAuth from './Components/Auth/RequireAuth'
import CreateCourse from './Pages/Course/CreateCourse'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route path="" element={<HomePage />}/>
        <Route path="/about" element={< AboutUs/>}/>
        <Route path="/courses" element={<CourseList/>}/>
        <Route path="/contact" element={<Contact />}/>
        <Route path="/denied" element={<Denied />}/>
        <Route path="/course/description" element={<CourseDescription />}/>

        <Route path='/signup' element={<SignUp />} />
        <Route path='/login' element={<LogIn />} />

        <Route element={<RequireAuth  allowedRolles={["admin"]} />} />
          <Route path='/course/create' element={<CreateCourse />} />
        <Route />

        <Route path='*' element ={<NotFound />}/>
      </Routes>

    </>
  )
}

export default App
