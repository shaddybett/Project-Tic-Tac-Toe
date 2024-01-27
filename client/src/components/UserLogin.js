import { useState } from "react";
import { useHistory } from "react-router";
import "../index"





function LoginForm() {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [formErrors, setFormErrors] = useState([]);
    const history = useHistory();
   
      const handleSubmit = (e) =>{
        e.preventDefault ()
        const formData = {
          email :email,
          password : password,
        }
        if(email.length === 0){
          alert("Email has left Blank!");
        }
        else if(password.length === 0){
          alert("password has left Blank!");
        }
        else{
            fetch('/login', {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
              })
            .then((r) => {
                if (r.ok) {
                  history.push(`/`);
                } else {
                  r.json().then((err) => setFormErrors(err.errors));
                }
              })
            .catch(function (error) {
                console.log(error, 'error');
                if (error.response.status === 401) {
                    alert("Invalid credentials");
                }
            });
        }
    }
 
      
    
        
  return (
    <div>
        <div className="login-page">
          <div className="container-fluid h-custom">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-md-9 col-lg-6 col-xl-5">
            
              </div>
              <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                <form onSubmit={handleSubmit}>
                  <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
                    <p className="lead fw-normal mb-0 me-3">Log Into Your Account</p>
                  </div>
 
                  <div className="form-outline mb-4 form-group">
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} id="form3Example3" className="input-field" placeholder="Enter a valid email address" />
                    <label className="form-label" for="form3Example3">Email address</label>
                  </div>
 
             
                  <div className="form-outline mb-3 form-group">
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} id="form3Example4" className="input-field" placeholder="Enter password" />
                    <label className="form-label" for="form3Example4">Password</label>
                  </div>

                  <div className="text-center text-lg-start mt-4 pt-2 form-group2">
                    <button type="submit" id="login-btn"  >Login</button>
                    <p className="small fw-bold mt-2 pt-1 mb-0">Don't have an account? <a href="/signup" className="link-danger">Register</a></p>
                  </div>
 
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="form-check mb-0">
                      <input className="form-check-input me-2" type="checkbox" value="" id="form2Example3" />
                      <label className="form-check-label" for="form2Example3">
                        Remember me
                      </label>
                    </div>
                    <a href="#!" className="text-body">Forgot password?</a>
                  </div>
                  {formErrors.length > 0
        ? formErrors.map((err) => (
            <p key={err} style={{ color: "red" }}>
              {err}
            </p>
          ))
        : null}
 
                  
 
                </form>
              </div>
            </div>
          </div>
        </div>
    </div>
  );
}
export default LoginForm;