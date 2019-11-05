import React, { useState } from 'react';
import ListMenu from './ListMenu';
import EditListForm from './EditListForm';
import Card from './Card';

function List(props) {
  const [showListMenu, setShowListMenu] = useState(false);
  const [showListEdit, setShowListEdit] = useState(false);
  const { toggleListAction, title, id } = props

  const toggleListMenu = () => {
    setShowListMenu(!showListMenu);
  }

  const toggleShowListEdit = () => {
    setShowListEdit(!showListEdit);
  }

  return (
    <div className="list-container">
      <div className="list-header">
        {showListEdit ? <EditListForm title={title} toggleListAction={toggleListAction} toggleShowListEdit={toggleShowListEdit} toggleListMenu={toggleListMenu} listId={id} /> : title}
        <div className="list-settings" onClick={toggleListMenu}>
          ...
        </div>
      </div>
      <div className="list-menu">
        {showListMenu ? <ListMenu listId={id} toggleListAction={toggleListAction} toggleShowListEdit={toggleShowListEdit} /> : null}
      </div>
      <div className="list-body">
        <Card />
      </div>
    </div>
  )
}

export default List;
