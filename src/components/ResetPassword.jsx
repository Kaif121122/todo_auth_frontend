import { useState } from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const ResetPassword = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

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
        navigate('/')
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

  return (
    <div className="container">
      <h1>Reset password</h1>
      <form onSubmit={resetPassword} >

        <div className="input-container">
          <label htmlFor="password">Password : </label>
          <input type="text" id='password' required name='password' value={password} placeholder='Enter your new password' onChange={(e) => setPassword(e.target.value)} />

        </div>

        <button type='submit' className="btn">Submit</button>
        {error && <p className='error-para'>{error}</p>}

        {success && <Link to='/login'><button className="btn">Go to login page</button></Link>}
      </form>
    </div>
  )
}

export default ResetPassword