import React from 'react';

function Signup(props) {
  return (
    <div className="form-container">
      <form>
        <label className="form-item">
          First Name 
          <input className="landing-input" type="text" name="firstname" required/>
        </label>
        <label className="form-item">
          Last Name
          <input className="landing-input" type="text" name="email" required/>
        </label>
        <label className="form-item">
          Email 
          <input className="landing-input" type="text" name="email" required/>
        </label>
        <label className="form-item">
          Password 
          <input className="landing-input" type="password" name="password" required/>
        </label>
        <label className="form-item">
          Re-type Password 
          <input className="landing-input" type="password" name="confirmpassword" required/>
        </label>
      </form>
    </div>
  )
}

export default Signup;
