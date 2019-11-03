import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

function ProjectForm(props) {
  const [title, setTitle] = useState('');

  const handleChange = (e) => {
    setTitle(e.target.value);
  }

  const newProject = (e) => {
    e.preventDefault();

    axios.post('https://issue-base-db.herokuapp.com/api/projects/create', {
      title: title,
      user_id: localStorage.user_id,
      members: [localStorage.user_id]
    },{
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.token
      }
    })
    .then(function (response) {
      console.log(response);
      props.hide();
      props.routerProps.history.push(`/app/projects/${response.data.proj_id}`);
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
    })
  }

  return (
    <div className="project-form">
      <form onSubmit={newProject}>
        <label className="project-form-item">
          Title
          <input type="text" className="project-form-input" name="title" onChange={handleChange} required/>
        </label>
        <button type="submit">
          Create
        </button>
      </form>
    </div>
  )
}

export default ProjectForm;
