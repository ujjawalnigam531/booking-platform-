import React from 'react'
import { useNavigate } from 'react-router-dom'

const Register = () => {
    const navigte=useNavigate();
    
  return (
    <div>
      <form action="" onSubmit={()=>{navigte("/verifyotp")}}>
      <div>
        <label htmlFor="Name">Name - </label>
        <input type="text" id='Name' name='Name' placeholder='Enter you name' required />
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
        <option value='admin'>admin</option>
        <option value="user">user</option>
        <option value="owner">owner</option>
        </select>
      </div>
       <div>
        <label htmlFor="image">Image - </label>
        <input type="file" id='image' name='image' placeholder='Enter you image' required />
       </div>
       <button type='submit'>Submit</button>
      </form>
    </div>
  )
}

export default Register
