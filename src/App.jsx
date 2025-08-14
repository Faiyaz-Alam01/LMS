import { Route, Routes } from 'react-router-dom'
import './App.css'
import { useState } from 'react'

import HomePage from './Pages/HomePage'
import AboutUs from './Pages/AboutUs'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route path="" element={<HomePage />}/>
        <Route path="/about" element={< AboutUs/>}/>
      </Routes>
    </>
  )
}

export default App
