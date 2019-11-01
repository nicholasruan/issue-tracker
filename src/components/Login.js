import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

function Login(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();

    axios.post('http://localhost:5000/api/users/login', {
      email: email,
      password: password
    })
    .then(function (response) {
      localStorage.token = response.data.user_token;
      localStorage.user_id = response.data._id;
      props.routerProps.history.push('/app');
    })
    .catch((error) => {
      const message = error.response.data || '';
      Swal.fire({
        position: 'top-end',
        title: message,
        showConfirmButton: false,
        timer: 4000,
        width: 500
      });
    })
  }

  const handleChange = (e) => {
    if (e.target.name === 'email') {
      setEmail(e.target.value);
    } else {
      setPassword(e.target.value);
    }
  }

  return (
    <div className="form-container">
      <form onSubmit={handleLogin}>
        <label className="form-item">
          Email
          <input className="landing-input" type="text" name="email" onChange={handleChange} required/>
        </label>
        <label className="form-item">
          Password
          <input className="landing-input" type="password" name="password" onChange={handleChange} required/>
        </label>
        <button type="submit">
          Login
        </button>
      </form>
    </div>
  )
}

export default Login;
