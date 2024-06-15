// components/Login.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/authContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import './login.css';


const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/calendar/home');
    }
  }, [isAuthenticated, navigate]); // Depend on isAuthenticated and navigate

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const getSignupInfo = localStorage.getItem("User")?.split(",") || [];
    const [, registeredEmail, registeredPassword] = getSignupInfo;
    const getFormInput = new FormData(event.currentTarget);
    const email = getFormInput.get("email") as string;
    const password = getFormInput.get("password") as string;

    if (registeredEmail === email && registeredPassword === password) {
      setStatus("Logging In...");
      setTimeout(() => {
        login();
        navigate("/calendar/home");
      }, 3000);
    } else if (getSignupInfo.length < 1) {
      setStatus("Please Sign Up");
    } else {
      setStatus("Incorrect Credentials");
    }
  };

  return (
    <div className="login-layout">
      <form className="page-form login-form" onSubmit={handleSubmit}>
        <h1 className="form-title">Sign In</h1>
        <div className='form-input input-field'>
          <FontAwesomeIcon icon={faUser} size='2xl'></FontAwesomeIcon>
          <input
            type="text"
            name="email"
            placeholder="Email"
            value={email}
            autoComplete='off'
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className='form-input input-field'>
          <FontAwesomeIcon icon={faLock} size='2xl'></FontAwesomeIcon>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            autoComplete='off'
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="form-button submit">Login</button>
        <p>Don't have an account?</p>
        <button type="button" className="form-button register" onClick={() => navigate('/calendar/signup')}>Sign Up</button>
        <span id="status" className={status === 'Logging In...' ? 'success' : 'fail'}>{status}</span>
      </form>
    </div>
  );
};

export default Login;