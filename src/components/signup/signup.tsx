import { useState, ChangeEvent } from "react";
import React from "react";
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faCheckCircle, faAddressBook } from "@fortawesome/free-regular-svg-icons";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import './signup.css';

function SignUp() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [status, setStatus] = useState("");
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/;
  const getSignupInfo = localStorage.getItem("User")?.split(",") || [];

  const isPasswordMatch = formData.password === formData.confirmPassword && formData.confirmPassword !== "";
  const isEmailValid = emailRegex.test(formData.email);
  const isPasswordValid = passwordRegex.test(formData.confirmPassword)
  const isFirstPassValid = passwordRegex.test(formData.password);

  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!isEmailValid) {
      setStatus("Enter a valid email");
      return;
    }

    if (!isPasswordValid) {
      setStatus("Enter a valid password");
      return;
    }

    if (formData.email === getSignupInfo[0]) {
      setStatus("Email Already Exists");
      return;
    }

    const setAccountInfo = `${formData.name},${formData.email},${formData.confirmPassword}`;
    localStorage.setItem("User", setAccountInfo)

    setStatus("Account Created Successfully");
    setTimeout(() => {
      navigate("/calendar/");
    }, 3000);
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  return (
    <div className="signup-layout">
      <form className="page-form signup-form" onSubmit={handleSubmit}>
        <h1 className="form-title">Sign Up</h1>
        <div className="form-input input-field">
          <FontAwesomeIcon icon={faAddressBook} size='2xl'></FontAwesomeIcon>
          <input
            type="text"
            name="name"
            placeholder="First Name"
            onChange={handleChange}
            value={formData.name}
            autoComplete="off"
            required
          />
        </div>

        <div className="form-input input-field">
          <FontAwesomeIcon icon={faEnvelope} size='2xl'></FontAwesomeIcon>
          <input
            type="text"
            name="email"
            placeholder="Email Address"
            onChange={handleChange}
            value={formData.email}
            autoComplete="off"
            required
          />
        </div>
        <div className="form-input input-field" id={isPasswordMatch ? "border-green" : "border-red"}>
          <FontAwesomeIcon icon={faLock} size='2xl'></FontAwesomeIcon>
          <input
            type="password"
            name="password"
            placeholder="Create Password"
            onChange={handleChange}
            value={formData.password}
            autoComplete="off"
            required
          />
        </div>
        <div className="form-input input-field" id={isPasswordMatch ? "border-green" : "border-red"}>
          <FontAwesomeIcon icon={faCheckCircle} size='2xl'></FontAwesomeIcon>
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            onChange={handleChange}
            value={formData.confirmPassword}
            autoComplete="off"
            required
          />
        </div>
        {isEmailValid ?
          <></>
          :
          <div className="requirements">
            <p>Username requiements:</p>
            <ul>
              <li>Username must be a valid email</li>
            </ul>
          </div>
        }
        {isFirstPassValid ?
          <></>
          :
          <div className="requirements">
            <p>Password Requirements:</p>
            <ul>
              <li>No less than 8 characters in length</li>
              <li>Must contain a special character</li>
              <li>Must contain 1 capital letter</li>
              <li>No Spaces</li>
            </ul>
          </div>
        }

        <button type="submit" className="form-button" id={isPasswordMatch && isEmailValid ? "matched" : "not-match"} disabled={!isPasswordMatch || !isEmailValid}>Register</button>
        <span className={status === "Account Created Successfully" ? "success" : "fail"} id="status">{status}</span>
      </form>
    </div>
  );
}

export default SignUp;