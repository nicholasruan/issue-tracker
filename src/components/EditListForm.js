import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

function EditListForm(props) {
  const [title, setTitle] = useState(props.title);
  const { listId, toggleListAction, toggleShowListEdit, toggleListMenu } = props

  const handleChange = (e) => {
    setTitle(e.target.value);
  }

  const editList = (e) => {
    e.preventDefault();

    axios.put(`https://issue-base-db.herokuapp.com/api/lists/${listId}/edit`, {
      title: title,
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
        title: 'List Updated',
        showConfirmButton: false,
        customClass: 'success',
        timer: 3000,
        width: 500
      });
      toggleListMenu();
      toggleShowListEdit();
      toggleListAction(true);
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
    <div>
      <form onSubmit={editList}>
        <input type="text" className="list-edit-input" value={title} name="title" onChange={handleChange} />
        <button type="submit">Done</button>
      </form>
    </div>
  )
}

export default EditListForm;
