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

  return (
    <div className="nav-container">
      <nav className="menu">
        <div className="logo-container">
          <h1 className="logo">IssueBase</h1>
        </div>
        <ul className="nav-links">
          <li>
            <a href="#">Dashboard</a>
          </li>
          <li>
            <a href="#">Meetings</a>
          </li>
          <li>
            <a href="#">Settings</a>
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
