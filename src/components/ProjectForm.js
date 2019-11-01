import React from 'react';

function ProjectForm(props) {

  return (
    <div className="project-form">
      <form>
        <label className="project-form-item">
          Title
          <input type="text" name="title" required/>
        </label>
        <button type="submit">
          Create
        </button>
      </form>
    </div>
  )
}

export default ProjectForm;
