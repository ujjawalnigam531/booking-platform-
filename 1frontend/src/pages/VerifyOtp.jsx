import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const VerifyOtp = () => {
  const [formData, setFormData] = useState({
    email: '',
    otp: ''
  })
   const navigate=useNavigate()
  function handleChange(e) {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      console.log("Sending:", formData)  // debug ke liye — payload check karne ke liye
      const response = await axios.post("http://localhost:5000/api/auth/otp", formData)
      toast(response.data.message)
      if(response.data.message==="user is created "){
       navigate("/home")
      }
    } catch (error) {
      console.log(error)
      toast.error(error.response?.data?.message || "Something went wrong")
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">ENTER YOUR EMAIL - </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="otp">ENTER YOUR OTP - </label>
          <input
            type="number"
            id="otp"
            name="otp"
            value={formData.otp}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default VerifyOtp