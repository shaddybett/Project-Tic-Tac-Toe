import { useState } from "react";
import { useHistory } from "react-router";
import '../index'

function SignupForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formErrors, setFormErrors] = useState([]);
  const history = useHistory();


  function handleSubmit(e) {
    e.preventDefault();
    const formData = {
      username: username,
      email: email,
      password: password,
     
    };
    fetch("/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    }).then((r) => {
      if (r.ok) {
        history.push(`/select`);
      } else if (response.status === 401) {
        setFormErrors(["Invalid credentials"]);
      } else if (response.status === 400) {
        return response.json();
      } else {
        throw new Error("Unexpected error occurred");
      }
    })
    .then((err) => {
      if (err && err.errors) {
        setFormErrors(err.errors);
      }
    })
    .catch((error) => {
      console.error("Error during login:", error);
    });
  }

  return (
    <div className="form-div">
      <form method="post" onSubmit={handleSubmit}>
      <div className="form-outline mb-4 form-group">
        <label htmlFor="username">Username:</label>
        <input type="text" className="input-field" id="username1" onChange={(e) => setUsername(e.target.value)} aria-describedby="usernameHelp" value={username} placeholder="username" name="username" required/>
      </div>
      <div className="form-outline mb-4 form-group">
        <label htmlFor="email">Email:</label>
        <input type="email" className="input-field" id="email1" onChange={(e) => setEmail(e.target.value)} aria-describedby="emailHelp" value={email} placeholder="email" name="email" required/>
      </div>
      <div className="form-outline mb-4 form-group">
        <label htmlFor="price">Password:</label>
        <input type="password"
          id="password1"
          name="password"
          className="input-field"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        </div>
        {formErrors.length > 0
          ? formErrors.map((err) => (
            <p key={err} style={{ color: "red" }}>
              {err}
            </p>
          ))
        : null}
         <div className="form-outline mb-4 form-group2">
            <button type="submit" id="signup-btn">Signup</button>
          </div>   
      </form>
    </div>
   
  );
}

export default SignupForm;