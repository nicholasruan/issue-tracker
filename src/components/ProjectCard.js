import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function ProjectCard(props) {
  const [name, setName] = useState('');

  useEffect(() => {
    if (props.name.length > 20) {
      setName(props.name.substring(0,20) + '...');
    } else {
      setName(props.name);
    }
  }, [props.name]);


  return(
    <Link to={`/app/projects/${props.id}`}className="project-card-link">
      <div className="project-card-container">
        <p className="project-card-text">{name}</p>
      </div>
    </Link>
  )
}

export default ProjectCard;
