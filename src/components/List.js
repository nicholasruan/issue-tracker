import React, { useState } from 'react';
import ListMenu from './ListMenu';
import EditListForm from './EditListForm';
import Card from './Card';

function List(props) {
  const [showListMenu, setShowListMenu] = useState(false);
  const [showListEdit, setShowListEdit] = useState(false);
  const { toggleListAction, title, id, moveList, index, projListSize } = props

  const toggleListMenu = () => {
    setShowListMenu(!showListMenu);
  }

  const toggleShowListEdit = () => {
    setShowListEdit(!showListEdit);
  }

  const renderTitle = (title) => {
    if (title.length >= 20) {
      return title.substring(0, 20) + '...';
    } else {
      return title;
    }
  }

  return (
    <div className="list-container">
      <div className="list-header">
        {showListEdit ? <EditListForm title={title} toggleListAction={toggleListAction} toggleShowListEdit={toggleShowListEdit} toggleListMenu={toggleListMenu} listId={id} /> : <h3 className="list-title">{renderTitle(title)}</h3>}
        <div className="list-settings" onClick={toggleListMenu}>
          ...
        </div>
      </div>
      <div className="list-menu">
        {showListMenu ? 
          <ListMenu 
            listId={id} 
            toggleListAction={toggleListAction} 
            toggleShowListEdit={toggleShowListEdit}
            moveList={moveList}
            index={index}
            projListSize={projListSize}
          /> : null}
      </div>
      <div className="list-body">
        <Card />
      </div>
    </div>
  )
}

export default List;
