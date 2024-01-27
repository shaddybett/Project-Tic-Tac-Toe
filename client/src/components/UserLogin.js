import React, { useState } from 'react';
import '../index'; 
import { useHistory } from "react-router";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const[formErrors, setFormErrors] = useState('');
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      email: email,
      password: password,
     
    };
    if(email.length === 0) {
      alert("Email is required")
  }else if(password.length === 0) {
    alert("Password is required")

  }else{
    fetch('/login',{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    }).then((r) => {
      if (r.ok) {
        history.push(`/game`);
      } else {
        r.json().then((err) => setFormErrors(err.errors));
      }
    });
  }
}

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        {formErrors.length > 0
        ? formErrors.map((err) => (
            <p key={err} style={{ color: "red" }}>
              {err}
            </p>
          ))
        : null}
        <div className="form-group">
          <button type="submit">Login</button>
        </div>
      </form>
      <p>
        Don't have an account? <a href="/signup">Create Account</a>
      </p>
      <p>
        Forgot your password? <a href="/forgot-password">Reset Password</a>
      </p>
    </div>
  );
};

export default Login;

