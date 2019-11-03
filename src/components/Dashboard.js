import React, { useState, useEffect } from 'react';
import Project from './Project';
import ProjectForm from './ProjectForm';
import Modal from './Modal';
import useModal from '../hooks/useModal';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Dashboard(props) {
  const {isShowing, toggle} = useModal();
  const [projectList, setProjects] = useState(['']);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    
    axios.get(`https://issue-base-db.herokuapp.com/api/users/${localStorage.user_id}`, 
    {
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.token
      }
    }).then(res => {
      console.log(res);
      setProjects(res.data.project_ids);
      setIsLoading(false);
    }).catch(err => {
      console.log(err);
    })
  }, []);


  if (isLoading) {
    return (
      <h1>Loading...</h1>
    )
  }

  return (
    <div className="dashboard">
      <div>
        <h2>Ongoing Projects</h2>
        <div className="dashboard-projects">
            <ul>
              {projectList.map(item => (
                <li key={item[0]}>
                  <Link to={`/app/projects/${item[0]}`}>{item[1]}</Link>
                </li>
              ))}
            </ul>

          <button className="modal-button" onClick={toggle}>
            +
          </button>
          <Modal
            isShowing={isShowing}
            hide={toggle}
            title={"New Project"}
          >
            <ProjectForm hide={toggle} routerProps={props} />
          </Modal>
        </div>
      </div>

      <div>
        Widgets
      </div>
    </div>
  )
}

export default Dashboard;
