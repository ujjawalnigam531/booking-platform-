import axios from 'axios'
import React, { useState } from 'react'
import { toast } from 'react-toastify'

const Login = () => {
const [data,setData]=useState({
    email: '',
    password: ""
})

const handleClick=(e)=>{
    const {name,value}=e.target
    setData((prev)=>({
        ...prev,
        [name]:value
    }))
}
const handleSubmit=(e)=>{
     try {
        e.preventDefault()
       const response= axios.post(`http://localhost:5000/api/auth/login`,data)
        toast(response.data.message)
     } catch (error) {
        
     }
}     

  return (
    <div>
      <form action="" onSubmit={handleSubmit}>
        <div>
            <label htmlFor="email">Email</label>
            <input type="text" name="email" id="email" onChange={handleClick}/>
        </div>
        <div>
            <label htmlFor="password">Password</label>
            <input type="password" name="password" id="password" onChange={handleClick} />
        </div>
        <button type="submit">submit</button>
      </form>
    </div>
  )
}

export default Login
