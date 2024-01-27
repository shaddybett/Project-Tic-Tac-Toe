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
      } else {
        r.json().then((err) => setFormErrors(err.errors));
      }
    });
  }

  return (
   
    <form method="post" onSubmit={handleSubmit}>
      <label htmlFor="username">Username:</label>
      <input type="text" className="form-control" id="username1" onChange={(e) => setUsername(e.target.value)} aria-describedby="usernameHelp" value={username} placeholder="username" name="username" required/>
      
      <label htmlFor="email">Email:</label>
      <input type="email" className="form-control" id="email1" onChange={(e) => setEmail(e.target.value)} aria-describedby="emailHelp" value={email} placeholder="email" name="email" required/>

      <label htmlFor="price">Password:</label>
      <input type="password"
        id="password1"
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {formErrors.length > 0
        ? formErrors.map((err) => (
            <p key={err} style={{ color: "red" }}>
              {err}
            </p>
          ))
        : null}
      <button type="submit">Signup</button>
    </form>
  );
}

export default SignupForm;