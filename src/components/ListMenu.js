import React from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import { faArrowRight} from '@fortawesome/free-solid-svg-icons';

function ListMenu(props) {
  const { toggleListAction, toggleShowListEdit, moveList, index, projListSize } = props;

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

  // if array size is one then dont show the move
  // if the current index is 0 then dont show move left
  // if the current index is length - 1 then dont show move right
  const renderMoveMenu = (idx) => {
    if (projListSize === 1) {
      return null;
    } if (idx === 0) {
      return (
        <div className="list-menu-item" onClick={() => moveList('right', index)}>
          <FontAwesomeIcon icon={faArrowRight} /> Move Right
        </div>)
    } if (idx === projListSize - 1) {
      return (
        <div className="list-menu-item" onClick={() => moveList('left', index)}>
          <FontAwesomeIcon icon={faArrowLeft} /> Move Left
        </div>
      )
    } else {
      return (
        <>
          <div className="list-menu-item" onClick={() => moveList('left', index)}>
          <FontAwesomeIcon icon={faArrowLeft} /> Move Left
          </div>
          <div className="list-menu-item" onClick={() => moveList('right', index)}>
            <FontAwesomeIcon icon={faArrowRight} /> Move Right
          </div>
        </>
      )
    }
  }


  return (
    <div className="list-menu-container">
      <div className="list-menu-item" onClick={toggleShowListEdit}>
        <FontAwesomeIcon icon={faEdit} /> Edit
      </div>
      <div className="list-menu-item" onClick={deleteList}>
        <FontAwesomeIcon icon={faTrashAlt} /> Delete
      </div>
      {renderMoveMenu(index)}
    </div>
  )
}

export default ListMenu;
