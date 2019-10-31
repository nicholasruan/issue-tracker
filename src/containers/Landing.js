import React, { useState } from 'react';
import Signup from '../components/Signup';
import Login from '../components/Login';
import bgImage from '../assets/landing-img.png'

function Landing(props) {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  return (
    <div className="outer-container">
      <div className="landing-container">
        <h1 className="landing-title">Issue Tracker</h1>
        <h2 className="landing-text">Get your<br/>work done.<br/>Together.</h2>

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

        {showLogin ? <Login routerProps={props} /> : null}
        {showSignup ? <Signup showLogin={setShowLogin} showSignup={setShowSignup} /> : null}
      </div>
      <img className="landing-bg" src={bgImage} alt="background"></img>
    </div>
  )
}

export default Landing;
