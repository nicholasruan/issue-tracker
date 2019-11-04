import React from 'react';
import axios from 'axios';

function AddMemberForm(props) {
  return(
    <div className="add-member-form-container" style={props.showAddMembers ? {display: 'block'} : {display: 'none'}}>
      <label>
        Enter Email
        <input className="add-member-form-input" type="email" name="email" required/>
      </label>

      <button className="add-member-button">Add User</button>
    </div>
  )
}

export default AddMemberForm;
