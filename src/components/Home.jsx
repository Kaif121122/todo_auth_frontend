import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
    return (
        <div className='container'>
        
            <h1>Welcome to the Todo App !</h1>
            <div className="btn-container">

                <Link to='/register'><button className="btn">Register</button></Link>


                <Link to='/login'><button className="btn">Login</button></Link>

            </div>

        </div>
    )
}

export default Home