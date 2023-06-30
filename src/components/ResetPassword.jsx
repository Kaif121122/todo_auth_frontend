import { useState } from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import React from 'react'

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading,setLoading] = useState(true)

  const { token } = useParams();

  // Check the token is valid using get request 

  const resetPasswordPage = async () => {
    try {

      const response = await axios.get(`https://todo-app-vyrl.onrender.com/reset-password/${token}`, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const data = await response.data;

      if (data.status === 'token-error') {
        setLoading(false)
        setError(data.message)
      }else if (data.status === 'token-verified') {
        setLoading(false)
      }


    } catch (error) {
      console.log(error)
    }
  }

  // Reset the password 

  const resetPassword = async (e) => {
    e.preventDefault()
    try {

      const response = await axios.post(`https://todo-app-vyrl.onrender.com/reset-password/${token}`, { password }, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const data = await response.data;


      if (data.status === 'token-error') {
        setError(data.message)
      } else if (data.status === 'ok') {
        setError(data.message)
        setSuccess(true)
        setPassword('')
      }


    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    resetPasswordPage()
  }, [])

  if(loading){
    return (
      <h1>......Loading</h1>
    )
  }

  return (
    <div className="container">
      <h1>Reset password</h1>
      <form onSubmit={resetPassword} >

        <div className="input-container">
          <label htmlFor="password">Password : </label>
          <input autoComplete='off' type="text" id='password' required name='password' value={password} placeholder='Enter your new password' onChange={(e) => setPassword(e.target.value)} />

        </div>

        <button type='submit' className="btn">Submit</button>
        {error && <p className='error-para'>{error}</p>}

        {error && <Link to='/forgot-password'><button className="btn">Go to forgot password page</button></Link>}
        {success && <Link to='/login'><button className="btn">Go to login page</button></Link>}
      </form>
    </div>
  )
}

export default ResetPassword