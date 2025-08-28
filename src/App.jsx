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
import RequireAuth from './Components/Auth/RequireAuth.jsx'
import CreateCourse from './Pages/Course/CreateCourse'
import Profile from './Pages/User/Profile'
import EditProfile from './Pages/EditProfile'
import ChangePassword from './Pages/ChangePassword'
import ForgotPassword from './Pages/ForgotPassword.jsx' 
import ResetPassword from './Pages/ResetPassword.jsx'
import Displaylectures from './Pages/Dashboard/Displaylectures.jsx'
import Checkout from './Pages/Payment/Checkout.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />}/>
        <Route path="/about" element={< AboutUs/>}/>
        <Route path="/courses" element={<CourseList/>}/>
        <Route path="/contact" element={<Contact />}/>
        <Route path="/denied" element={<Denied />}/>
        <Route path="/course/description" element={<CourseDescription />}/>
        <Route path="/forgot-password" element={<ForgotPassword />}/>
        <Route path="/reset-password/:token" element={<ResetPassword />}/>

        <Route path='/signup' element={<SignUp />} />
        <Route path='/login' element={<LogIn />} />

        <Route element={<RequireAuth  allowRoles={["ADMIN"]} />} >
          <Route path="/course/create" element={<CreateCourse />}/>
        </Route>

        <Route element={<RequireAuth  allowRoles={["ADMIN","USER"]} />}>
          <Route path='/user/profile' element={<Profile />} />
          <Route path='/user/edit' element={<EditProfile />} />
          <Route path='/user/changepassword' element={<ChangePassword />} />
          <Route path='/course/displaylecture' element={<Displaylectures />} />
          <Route path='/checkout' element={<Checkout />} />
        </ Route>

        <Route path='*' element ={<NotFound />}/>
      </Routes>

    </>
  )
}

export default App
