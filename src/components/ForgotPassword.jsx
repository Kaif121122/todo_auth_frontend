import React from 'react'
import { useState } from 'react'
import axios from 'axios'

const ForgotPassword = () => {

    const [email, setEmail] = useState('')
    const [error, setError] = useState('')


    const forgotUser = async (e) => {
        e.preventDefault();

        try {


            const response = await axios.post('https://todo-app-vyrl.onrender.com/forgot-password', { email }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            const data = await response.data;
            console.log(data);

            if (data.status === 'user-err') {
                setError(data.message)
            } else if (data.status === 'ok') {
                setError(data.message)
            }
        } catch (error) {
            console.log(error)
        }

    }
    return (
        <div className="container">
            <h1>Forgot password</h1>

            <form onSubmit={forgotUser}>

                <div className="input-container">
                    <label htmlFor="email">Email : </label>
                    <input type="text" id='email' name='email' value={email} placeholder='Enter your email' onChange={(e) => setEmail(e.target.value)} />

                </div>

                <button type='submit' className="btn">Submit</button>
                {error && <p className='error-para'>{error}</p>}
            </form>

        </div>
    )
}

export default ForgotPassword