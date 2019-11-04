import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

function AddMemberForm(props) {
  const [email, setEmail] = useState('');

  const handleChange = (e) => {
    setEmail(e.target.value);
  }

  const addNewMembers = (e) => {
    e.preventDefault();

    axios.put(`https://issue-base-db.herokuapp.com/api/projects/${props.projectId}/addUser`, {
      email: email
    },{
      headers: {
      'Content-Type': 'application/json',
      'auth-token': localStorage.token
      }
    })
    .then(function (response) {
      console.log(response);
      Swal.fire({
        position: 'top-end',
        title: 'Member Added',
        showConfirmButton: false,
        customClass: 'success',
        timer: 3000,
        width: 500
      });
      setEmail('');
      props.toggleAddMembers();
    })
    .catch(function (error) {
      const message = error.response || '';
      Swal.fire({
        position: 'top-end',
        title: message.data,
        showConfirmButton: false,
        timer: 3000,
        width: 500
      });
    });
  }

  return(
    <div className="add-member-form-container" style={props.showAddMembers ? {display: 'block'} : {display: 'none'}}>
      <form onSubmit={addNewMembers}>
        <label>
          Enter Email
          <input className="add-member-form-input" type="email" name="email" onChange={handleChange} required/>
        </label>
        <button type="submit" className="add-member-button">Add User</button>
      </form>
    </div>
  )
}

export default AddMemberForm;
