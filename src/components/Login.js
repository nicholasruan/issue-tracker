import React from 'react';

function Login(props) {
  return (
    <div className="form-container">
      <form>
        <label className="form-item">
          Email 
          <input className="landing-input" type="text" name="email" required/>
        </label>
        <label className="form-item">
          Password 
          <input className="landing-input" type="password" name="password" required/>
        </label>
      </form>
    </div>
  )
}

export default Login;
