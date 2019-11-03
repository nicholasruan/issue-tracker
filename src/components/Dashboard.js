import React, { useState, useEffect } from 'react';
import Project from './Project';
import ProjectForm from './ProjectForm';
import Modal from './Modal';
import ProjectCard from './ProjectCard';
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

  return (
    <div className="dashboard">
      <div>
        <h2>Ongoing Projects</h2>
        {isLoading ? <h3>Loading...</h3> : 
          <div className="dashboard-projects">
            <ul>
              {projectList.map(item => (
                <li key={item[0]}>
                  <ProjectCard 
                    id={item[0]}
                    name={item[1]}
                  />
                </li>
              ))}
            </ul>
          <button className="modal-button" onClick={toggle}>
            Add a new project
          </button>
          <Modal
            isShowing={isShowing}
            hide={toggle}
            title={"New Project"}
          >
            <ProjectForm hide={toggle} routerProps={props} />
          </Modal>
        </div>
      }
      </div>
      <div>
        <h2>Widgets</h2>
      </div>
    </div>
  )
}

export default Dashboard;
