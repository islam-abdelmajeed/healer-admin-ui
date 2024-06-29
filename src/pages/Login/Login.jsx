import './Login.scss';
import Logo from './assets/logo.png';
import Charts from './assets/charts.png';
import React, { useState } from 'react';
import { useAuth } from '../../hooks/use-auth.js';
import axios from '../../axios.js';
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const { onLogin } = useAuth();
  const [error,setError]=useState("")
  const navigate=useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    try {
      const response = await axios.post('/api/auth/login', { email, password, role: 'admin' });
      console.log(response.data)
      const { token, user, role } = response.data;
      setPassword("")
      setEmail("")
      onLogin(token, user.name, role);
      navigate('/')
    } catch (error) {
      console.log(error)
      setError(error.response.data.message);
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  };
  return (
    <div className="login d-flex">
      <div className="imgs w-50 d-flex flex-column justify-content-center align-items-center gap-5 ">
        <img src={Logo} alt="logo" width={160} />
        <img src={Charts} alt="charts" width={343} />
        <div className="">
          <h2>Welcome Back</h2>
          <p>Everything you need in an easily.</p>
        </div>
      </div>
      <div className="box w-50 bg-white d-flex flex-column justify-content-center align-items-center gap-5">
        <div className="d-flex flex-column justify-content-center align-items-center">
          <h2>Log In to your Account</h2>
          <span>Welcome back! please enter your detail</span>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="">
            <h6>Email</h6>
            <div className='inp-box'>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 5H5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5Z" stroke="#64748B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M3 7L12 13L21 7" stroke="#64748B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <input
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value) }}
                placeholder='Type your email here...'
              />
            </div>
          </div>
          <div className="mt-4">
            <h6>Password</h6>
            <div className='inp-box'>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M17 11H7C5.89543 11 5 11.8954 5 13V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V13C19 11.8954 18.1046 11 17 11Z" stroke="#64748B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M12 17C12.5523 17 13 16.5523 13 16C13 15.4477 12.5523 15 12 15C11.4477 15 11 15.4477 11 16C11 16.5523 11.4477 17 12 17Z" stroke="#64748B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M8 11V7C8 5.93913 8.42143 4.92172 9.17157 4.17157C9.92172 3.42143 10.9391 3 12 3C13.0609 3 14.0783 3.42143 14.8284 4.17157C15.5786 4.92172 16 5.93913 16 7V11" stroke="#64748B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <input
                type="password"
                value={password}
                onChange={(e) => { setPassword(e.target.value) }}
                placeholder='Type your password here...'
              />
            </div>
          </div>
          <div className="forgot d-flex justify-content-end mt-2">
            {/* <span className='fw-bolder'>Forgot Password?</span> */}
          </div>
          {error&&<div className="alert alert-danger text-center" role="alert">
          {error}
        </div>}
          
          <input type="submit" value="Log In" className='submit' />
        </form>
      </div>
    </div>
  )
}
export default Login;