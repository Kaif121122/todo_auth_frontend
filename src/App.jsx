import React from 'react'
import RegisterForm from './components/RegisterForm'
import LoginForm from './components/LoginForm'
import { Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import TodoMain from './components/TodoMain'
import ForgotPassword from './components/ForgotPassword'
import ResetPassword from './components/ResetPassword'

const App = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/register' element={<RegisterForm />} />
        <Route path='/login' element={<LoginForm />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/reset-password/:token' element={<ResetPassword />} />
        <Route path='/todo' element={<TodoMain />} />
      </Routes>


    </>
  )
}

export default App