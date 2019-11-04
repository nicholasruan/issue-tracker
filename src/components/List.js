import React from 'react';
import Card from './Card';

function List(props) {
  return (
    <div className="list-container">
      {props.title}
    </div>
  )
}

export default List;
