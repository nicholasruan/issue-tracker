import React from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

function ListMenu(props) {
  const { toggleListAction, toggleShowListEdit } = props

  const deleteList = () => {
    axios.delete(`https://issue-base-db.herokuapp.com/api/lists/${props.listId}/delete`, { data: {
      list_id: props.listId,
    },
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.token
      }}
    )
    .then(function (response) {
      console.log(response);
      Swal.fire({
        position: 'top-end',
        title: 'List Deleted',
        showConfirmButton: false,
        customClass: 'success',
        timer: 3000,
        width: 500
      });
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
    <div className="list-menu-container">
      <div className="list-menu-item" onClick={toggleShowListEdit}>
        <FontAwesomeIcon icon={faEdit} /> Edit
      </div>
      <div className="list-menu-item" onClick={deleteList}>
        <FontAwesomeIcon icon={faTrashAlt} /> Delete
      </div>
    </div>
  )
}

export default ListMenu;
