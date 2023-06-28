import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import React from 'react'

const RegisterForm = () => {

    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userFields, setUserFields] = useState('');
    const [userError, setUserError] = useState('');
    const [serverError, setServerError] = useState('')

    const registerUser = async (e) => {
        e.preventDefault();
        try {

            const response = await axios.post('https://todo-app-vyrl.onrender.com/register', {
                name, email, password
            }, {

                headers: {
                    'Content-Type': 'application/json'
                }
            })

            const data = await response.data;
            console.log(data)

            if (data.status === "user-field-error") {
                console.log(data.message);
                setUserFields(data.message)

            } else if (data.status === "user-error") {
                console.log(data.message);
                setUserError(data.message);
                setUserFields('')

            } else if (data.status === "ok") {
                console.log(data.message);
                navigate('/login')
            } else if (data.status === "server-error") {
                console.log(data.message);
                setServerError(data.message)
                setUserFields('')
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='container'>
            <h1>Register</h1>

            <form className="register-form" onSubmit={registerUser}>
                <div className="input-container">
                    <label htmlFor="name">Name : </label>
                    <input autoComplete='off' type="text" id='name' name='name' value={name} placeholder='Enter your name' onChange={(e) => setName(e.target.value)} />
                </div><div className="input-container">
                    <label htmlFor="email">Email : </label>
                    <input autoComplete='off' type="text" id='email' name='email' value={email} placeholder='Enter your email' onChange={(e) => setEmail(e.target.value)} />
                    {userError && <p className='error-para'>{userError}</p>}
                </div><div className="input-container">
                    <label htmlFor="password">Password : </label>
                    <input autoComplete='off' type="text" id='password' name='password' value={password} placeholder='Enter your password' onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button type='submit' className="btn">Register</button>
                {userError && <Link to='/login'>
                    <button type='submit' className="btn">Go to login ?</button></Link>}
                {userFields && <p className='error-para'>{userFields}</p>}
                {serverError && <p className='error-para'>{serverError}</p>}
            </form>
        </div>
    )
}

export default RegisterForm