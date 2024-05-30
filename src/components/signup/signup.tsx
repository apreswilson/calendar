import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function SignUp() {
  const usernameRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const passwordRegex = /^(?=.*[^\w\s])(?!.*\s).{8,}$/;
  const navigateOnSubmit = useNavigate();

  const [username, setUsername] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [error, setError] = useState<string>("");
  const [accountCreated, setAccountCreated] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!usernameRegex.test(username)) {
      handleErrorTextChange("Username must be an email");
      return;
    }

    if (!passwordRegex.test(password)) {
      handleErrorTextChange("Password must meet requirements");
      return;
    }

    setAccountCreated(true)
    handleErrorTextChange("");
    setTimeout(() => {
      navigateOnSubmit("/calendar/");
    }, 2000);
  }

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  }

  const handleErrorTextChange = (error: string) => {
    setError(error);
  }

  return (
    <div className="signup-layout">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h1 className="form-title">Sign Up</h1>
        <input type="text" name="username" placeholder="Username..." value={username} onChange={handleUsernameChange}></input>
        <input type="password" name="password" placeholder="Password..." value={password} onChange={handlePasswordChange}></input>
        <p className="password-details">Your password must meet these requirements:</p>
        <ul>
          <li>8 Characters long</li>
          <li>Contain atleast 1 special character</li>
          <li>No spaces</li>
        </ul>
        <span className='error-text'>{error}</span>
        <button type="submit" className="submit">Register</button>
      </form>
      {accountCreated ? <p className='success'>Account Created</p> : <></>}
    </div>
  )
}

export default SignUp;