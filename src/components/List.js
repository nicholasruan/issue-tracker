import React, { useState } from 'react';
import ListMenu from './ListMenu';
import Card from './Card';

function List(props) {
  const [showListMenu, setShowListMenu] = useState(false);

  const toggleListMenu = () => {
    setShowListMenu(!showListMenu);
  }

  return (
    <div className="list-container">
      <div className="list-header">
        {props.title}
        <div className="list-settings" onClick={toggleListMenu}>
          ...
        </div>
      </div>
      <div className="list-menu">
        {showListMenu ? <ListMenu listId={props.id} toggleListAction={props.toggleListAction} /> : null}
      </div>
      <div className="list-body">
        <Card />
        {props.title === 'tests' ? <Card /> : null}
        {props.title === 'tests' ? <Card /> : null}
        {props.title === 'tests' ? <Card /> : null}
        {props.title === 'tests' ? <Card /> : null}
      </div>
    </div>
  )
}

export default List;
