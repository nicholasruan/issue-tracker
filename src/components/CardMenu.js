import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

function CardMenu(props) {
  return (
    <div className="card-menu-container">
      <div className="card-menu-item">
        <FontAwesomeIcon icon={faEdit} /> Edit
      </div>
      <div className="card-menu-item">
        <FontAwesomeIcon icon={faTrashAlt} /> Delete
      </div>
    </div>
  )
}

export default CardMenu;
