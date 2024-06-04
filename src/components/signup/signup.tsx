import { useState, ChangeEvent } from "react";
import React from "react";
import { useNavigate } from "react-router-dom"

function SignUp() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [status, setStatus] = useState("");
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/;

  const isPasswordMatch = formData.password === formData.confirmPassword && formData.confirmPassword !== "";
  const isEmailValid = emailRegex.test(formData.email);
  const isPasswordValid = passwordRegex.test(formData.confirmPassword)

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

    //! Account information using localstorage is only temporary    
    const setAccountInfo = `${formData.email},${formData.confirmPassword}`;
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
      <form className="signup-form" onSubmit={handleSubmit}>
        <h1 className="form-title">Register</h1>
        <input
          type="text"
          name="email"
          placeholder="Email Address"
          onChange={handleChange}
          value={formData.email}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Create Password"
          onChange={handleChange}
          value={formData.password}
          required
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          onChange={handleChange}
          value={formData.confirmPassword}
          className={isPasswordMatch ? "" : "border-red"}
          required
        />
        <p>Password Requirements:</p>
        <ul>
          <li>No less than 8 characters in length</li>
          <li>Must contain a special character</li>
          <li>Must contain 1 capital letter</li>
          <li>No Spaces</li>
        </ul>
        <button type="submit" disabled={!isPasswordMatch}>Register</button>
        <span className={status === "Account Created Successfully" ? "success" : "fail"}>{status}</span>
      </form>
    </div>
  );
}

export default SignUp;