import React from 'react'
import { Routes,Route } from 'react-router-dom'
import Register from './pages/Register'
import VerifyOtp from './pages/VerifyOtp'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './pages/Home';
const App = () => {
  return (
    <div>
      
  <Routes>
  <Route path='/register' element={<Register />} />
  <Route path='/verifyotp' element={<VerifyOtp />} />
  <Route path='/home' element={<Home />} />
  </Routes>
  <ToastContainer /> 
    </div>
  )
}

export default App

  