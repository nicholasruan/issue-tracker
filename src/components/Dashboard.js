import React from 'react';
import Project from './Project';
import ProjectForm from './ProjectForm';
import Modal from './Modal';
import useModal from '../hooks/useModal';

function Dashboard(props) {
  const {isShowing, toggle} = useModal();

  const renderProjects = () => {

  }

  return (
    <div className="dashboard">
      <div>
        <h2>Ongoing Projects</h2>
        <div className="dashboard-projects">
          {renderProjects}
          <button className="modal-button" onClick={toggle}>
            +
          </button>
          <Modal
            isShowing={isShowing}
            hide={toggle}
          >
            <ProjectForm />
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
