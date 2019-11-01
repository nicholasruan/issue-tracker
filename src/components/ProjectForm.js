import React from 'react';

function ProjectForm(props) {

  return (
    <div>
      <form>
        <label>
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
