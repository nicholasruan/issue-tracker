import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Project(props) {
  const[id, setId] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [title, setTitle] = useState('');
  const [members, setMembers] = useState([]);

  useEffect(() => {
    const path = window.locationnpm.pathname.split('/');
    setId(path[3]);
    axios.get(`https://issue-base-db.herokuapp.com/api/projects/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.token
      }
    }).then(res => {
      console.log(res.data);
      setTitle(res.data.project.title);
      setMembers(res.data.members);
      setIsLoading(false);
    }).catch(err => {
      console.log(err);
    })
  }, [id]);

  return (
    <div className="project-container">
      {isLoading ? (<h3>Loading...</h3>) : (
        <div className="project-header">
          <h2 className="project-title">{title}</h2>
          <button className="add-list-button">+ add new list</button>
          {members.map((members, key) => (
            <div className="member-circle">
              <p key={key}>{members.first_name.substring(0,1)
              }{members.last_name.substring(0,1)}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Project;
