import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import ProjectForm from './ProjectForm';
import Modal from './Modal';
import useModal from '../hooks/useModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

function Project(props) {
  const [id, setId] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [title, setTitle] = useState('');
  const [members, setMembers] = useState([]);
  const {isShowing, toggle} = useModal();

  useEffect(() => {
    const path = window.location.pathname.split('/');
    setId(path[3]);

    if (!id) return console.log('No Project Yet');

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

  const deleteProject = () => {
    axios.delete(`https://issue-base-db.herokuapp.com/api/projects/${id}/delete`, { data: {
      project_id: id,
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
        title: 'Project Deleted',
        showConfirmButton: false,
        timer: 3000,
        width: 500
      });
      props.history.push('/app')
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
    <div className="project-container">
      {isLoading ? (<h3>Loading...</h3>) : (
        <div className="project-header">
          <h2 className="project-title">{title}</h2>
          <div className="project-icons">
            <FontAwesomeIcon icon={faTrashAlt} className="project-actions" onClick={deleteProject} />
            <FontAwesomeIcon icon={faEdit} className="project-actions" onClick={toggle} />
          </div>
          <button className="add-list-button">+ add new list</button>
          <div className="member-container">
            <div className="member-circle">
              {members.map((members, key) => (
                  <p key={key}>{members.first_name.substring(0,1)
                  }{members.last_name.substring(0,1)}</p>
              ))}
            </div>
            <div className={`member-circle add-circle`}>
              <p>+</p>
            </div>
          </div>
        </div>
      )}
      <Modal
        isShowing={isShowing}
        hide={toggle}
        title={"Edit Project"}
      >
        <ProjectForm hide={toggle} routerProps={props} title={title} editMode={true} projectId={id} setTitle={setTitle} />
      </Modal>
    </div>
  )
}

export default Project;
