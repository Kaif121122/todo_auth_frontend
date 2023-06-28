import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'
import React from 'react'

const LoginForm = () => {

  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [invalidUsername, setInvalidUsername] = useState('');
  const [invalidPass, setInvalidPass] = useState('');
  const [serverError, setServerError] = useState('')

  const loginUser = async (e) => {
    e.preventDefault();

    try {

      const response = await axios.post('https://todo-app-vyrl.onrender.com/login', {
        email, password
      }, {

        headers: {
          'Content-Type': 'application/json'
        }
      })

      const data = await response.data;
      console.log(data)

      if (data.status === 'ok') {
        localStorage.setItem('token', data.userData)
        console.log(data.message);
        navigate('/todo')
      } else if (data.status === 'user-invalid-error') {
        setInvalidUsername(data.message)
      } else if (data.status === 'user-pass-error') {
        setInvalidPass(data.message)
        setInvalidUsername('')
      }
      else if (data.status === 'server-error') {
        setServerError(data.message)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='container'>
      <h1>Login</h1>

      <form className="register-form" onSubmit={loginUser}>
        <div className="input-container">
          <label htmlFor="email">Email : </label>
          <input type="text" id='email' name='email' value={email} placeholder='Enter your email' onChange={(e) => setEmail(e.target.value)} />
          {invalidUsername && <p className='error-para'>{invalidUsername}</p>}
        </div><div className="input-container">
          <label htmlFor="password">Password : </label>
          <input type="text" id='password' name='password' value={password} placeholder='Enter your password' onChange={(e) => setPassword(e.target.value)} />
          {invalidPass && <p className='error-para'>{invalidPass}</p>}
        </div>
        <button type='submit' className="btn">Login</button>
        <Link to='/forgot-password'><button className="btn">Forgot password ?</button></Link>
        {serverError && <p className='error-para'>{serverError}</p>}
      </form>
    </div>
  )
}

export default LoginForm