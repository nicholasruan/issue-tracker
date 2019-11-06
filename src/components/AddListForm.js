import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

function AddListForm(props) {
  const [name, setName] = useState('');

  const handleChange = (e) => {
    setName(e.target.value);
  }

  const newList = (e) => {
    e.preventDefault();
    
    axios.post('https://issue-base-db.herokuapp.com/api/lists/create', {
      title: name,
      project_id: props.projId
    },{
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.token
      }
    })
    .then(function (response) {
      console.log(response);
      props.showList(false);
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
    <div className="list-container add-form">
      <form onSubmit={newList}>
        <input type="text" placeholder="Name" value={name} onChange={handleChange} />
        <button type="submit">add list</button>
      </form>
    </div>
  )
}

export default AddListForm;
