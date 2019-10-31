import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

function Signup(props) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmPassword] = useState('');

  const handleSignup = (e) => {
    e.preventDefault();
    console.log(firstName, lastName, email, password, confirmpassword);

    if (password !== confirmpassword) return alert('Passwords do not match');

    axios.post('http://localhost:5000/api/users/register', {
      first_name: firstName,
      last_name: lastName,
      email: email,
      password: password
    })
    .then(function (response) {
      console.log(response);
      props.showLogin(true);
      props.showSignup(false);
      Swal.fire({
        position: 'top-end',
        title: 'Account created! Please login',
        showConfirmButton: false,
        timer: 3000,
        width: 500
      });
    })
    .catch(function (error) {
      Swal.fire({
        position: 'top-end',
        title: error.response.data,
        showConfirmButton: false,
        timer: 3000,
        width: 500
      });
    })
  }

  const handleChange = (e) => {
    switch (e.target.name) {
      case 'firstname':
        setFirstName(e.target.value);
        break;
      case 'lastname':
        setLastName(e.target.value);
        break;
      case 'email':
        setEmail(e.target.value);
        break;
      case 'password':
        setPassword(e.target.value);
        break;
      case 'confirmpassword':
        setConfirmPassword(e.target.value);
        break;
      default:
        return null;
    }
  }

  return (
    <div className="form-container">
      <form onSubmit={handleSignup}>
        <label className="form-item">
          First Name
          <input className="landing-input" type="text" name="firstname" onChange={handleChange} required/>
        </label>
        <label className="form-item">
          Last Name
          <input className="landing-input" type="text" name="lastname" onChange={handleChange} required/>
        </label>
        <label className="form-item">
          Email
          <input className="landing-input" type="text" name="email" onChange={handleChange} required/>
        </label>
        <label className="form-item">
          Password
          <input className="landing-input" type="password" name="password" onChange={handleChange} required/>
        </label>
        <label className="form-item">
          Re-type Password
          <input className="landing-input" type="password" name="confirmpassword" onChange={handleChange} required/>
        </label>
        <button type="submit">
          Signup
        </button>
      </form>
    </div>
  )
}

export default Signup;
