import React from 'react'
import { Routes,Route } from 'react-router-dom'
import Register from './pages/Register'
import VerifyOtp from './pages/VerifyOtp'
const App = () => {
  return (
    <div>
      
  <Routes>
  <Route path='/register' element={<Register />} />
  <Route path='/verifyotp' element={<VerifyOtp />} />
 </Routes>
    </div>
  )
}

export default App

  