import React from 'react'
import { useNavigate } from 'react-router-dom'
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import axios from 'axios'
const Register = () => {
    const navigte=useNavigate();
    const text=async(e)=>{
      try{
        e.preventDefault()
        const data=new FormData(e.currentTarget)
          const response= await axios.post('http://localhost:5000/api/auth/userRegister',data)
            console.log(response)       
              toast(response.data.message); 
        if(response.data.message === "now verifying email "){
          navigte("/verifyotp")
        }   
      }catch(error){
        toast.error(error.response?.data?.message || "Something went wrong")
        console.error(error)
      }
      }
  return (
    <div>
      <form action="" onSubmit={text}>
      <div>
        <label htmlFor="Name">Name - </label>
        <input type="text" id='Name' name='name' placeholder='Enter you name' required />
      </div>
      <div>
        <label htmlFor="email">email - </label>
        <input type="email" id='email' name='email' placeholder='Enter you email' required />
      </div>
      <div>
        <label htmlFor="password">Password - </label>
        <input type='password' id='password' name='password' placeholder='Enter you password' required />
      </div>
      <div>
        <label htmlFor="phone">phone - </label>
        <input type="text" id='phone' name='phone' placeholder='Enter you phone' required />
      </div>
      <div>
        <label htmlFor="role">Role - </label>
        <select name="role" id="role">
        <option value='admin'>owner</option>
        <option value="user">user</option>
       
        </select>
      </div>
       <div>
        <label htmlFor="image">Image - </label>
        <input type="file" id='image' name='Image' placeholder='Enter you image' required />
       </div>
       <button type='submit'>Submit</button>
      
      </form>
    </div>
  )
}

export default Register
 