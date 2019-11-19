import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

function AddCardForm(props) {
  const [name, setName] = useState('');
  const { setShowCardForm } = props;

  const handleChange = (e) => {
    setName(e.target.value);
  }

  const newCard = (e) => {
    e.preventDefault();

    axios.post('https://issue-base-db.herokuapp.com/api/cards/create', {
      name: name,
      created_by: props.userName,
      list_id: props.listId
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
    <div className="add-card-form">
      <form onSubmit={newCard}>
        <input type="text" placeholder="Name" value={name} onChange={handleChange} />
        <button type="submit">add card</button>
      </form>
      <div
        className="cancel-card-form"
        onClick={() => setShowCardForm(false)}
      >
        x
      </div>
    </div>
  )
}

export default AddCardForm;
