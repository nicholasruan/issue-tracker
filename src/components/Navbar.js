import React from 'react';
import { Link } from 'react-router-dom';

function Navbar(props) {
  const burgerShow = () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    nav.classList.toggle('nav-active');

    navLinks.forEach((link, index) => {
      if (link.style.animation) {
        link.style.animation = '';
      } else {
        link.style.animation = `navLinkFade 0.3s ease forwards ${index / 5 + .3}s`
      }
    });

    burger.classList.toggle('toggle');
  }

  const logout = () => {
    localStorage.token = '';
    localStorage.user_id = '';
  }

  return (
    <div className="nav-container">
      <nav className="menu">
        <div className="logo-container">
          <h1 className="logo">IssueBase</h1>
        </div>
        <ul className="nav-links">
          <li>
            <Link to="/app">Dashboard</Link>
          </li>
          <li>
            <Link to="/app/meetings">
            Meetings</Link>
          </li>
          <li>
            <Link to="/app/profile">
            Settings</Link>
          </li>
          <li>
            <Link to="/" onClick={logout}>Logout</Link>
          </li>
        </ul>

        <div className="burger" onClick={ burgerShow}>
          <div className="line1"></div>
          <div className="line2"></div>
          <div className="line3"></div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar;
