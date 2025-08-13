import { Route, Routes } from 'react-router-dom'
import './App.css'
import { useState } from 'react'

import HomePage from './Pages/HomePage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route path="" element={<HomePage />}/>
      </Routes>
    </>
  )
}

export default App
