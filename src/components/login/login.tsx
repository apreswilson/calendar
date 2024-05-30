import './login.css';
import { useState } from 'react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


function Login() {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigateOnSubmit = useNavigate();

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/calendar/`, { username, password });
      const token = response.data.token;
      localStorage.setItem('token', token);
      navigateOnSubmit("/calendar/home");
    } catch (error) {
      console.error("Failed to login:", error);
      console.log("Failed");
    }

  }

  const navigateToSignIn = () => {
    navigateOnSubmit("/calendar/signup");
  }

  return (
    <div className="login-layout">
      <form className="login-form" onSubmit={handleSubmit}>
        <h1 className="form-title">Log In</h1>
        <input type="text" name="username" placeholder="Username..." value={username} onChange={handleUsernameChange}></input>
        <input type="password" name="password" placeholder="Password..." value={password} onChange={handlePasswordChange}></input>
        <span className='error-text'></span>
        <button type="submit" className="submit bottom-buttons">Login</button>
        <p>Dont have an account?</p>
        <button className="signup bottom-buttons" onClick={navigateToSignIn}>Sign Up</button>
      </form>
    </div>
  )
}

export default Login;