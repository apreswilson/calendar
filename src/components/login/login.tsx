import { useNavigate } from "react-router-dom"
import { useState } from "react";

function Login() {
  const navigate = useNavigate();
  const [status, setStatus] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // ! This is only a temporary form of login that will be replaced later
    const getSignupInfo = localStorage.getItem("User")?.split(",") || [];
    const [registeredEmail, registeredPassword] = getSignupInfo;
    const getFormInput = new FormData(event.currentTarget);
    const email = getFormInput.get("email") as string;
    const password = getFormInput.get("password") as string;

    if (registeredEmail === email && registeredPassword === password) {
      setStatus("Logging In");
      setTimeout(() => {
        navigate("/calendar/home");
      }, 3000);
    } else if (getSignupInfo.length < 1) {
      setStatus("Please Sign Up");
    } else {
      setStatus("Incorrect Credentials");
    }

  }

  return (
    <div className="login-layout">
      <form className="login-form" onSubmit={handleSubmit}>
        <h1 className="form-title">Login</h1>
        <input type="text" name="email" placeholder="Email"></input>
        <input type="password" name="password" placeholder="Password"></input>
        <button type="submit" className="submit">Login</button>
        <p>Dont have an account?</p>
        <button onClick={() => navigate("/calendar/signup")}>Register</button>
        <span className={status === "Logging In" ? "success" : "fail"}>{status}</span>
      </form>

    </div>

  )
}

export default Login;