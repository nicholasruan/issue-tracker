import React, { useState } from 'react';
import Signup from '../components/Signup';
import Login from '../components/Login';

function Landing(props) {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  return (
    <div>
      <h1>Get your<br/>work done.<br/>Together.</h1>

      <div className="landing-button-container">
        <button className="landing-button" onClick={() => {
          setShowLogin(true); 
          setShowSignup(false); 
        }}>Login</button>

        <button className="landing-button" onClick={() => {
          setShowSignup(true); 
          setShowLogin(false); 
          }}>Signup</button>
      </div>
      
      {showLogin ?<Login /> : null}
      {showSignup ? <Signup /> : null}
    </div>
  )
}

export default Landing;
