import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

function Card(props) {
  const { name, index, id } = props;
  
  return (
    <div>
      <Draggable draggableId={id} index={index}>
        {(provided) => (
          <div
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            className="card-body"
          >
            {name}
          </div>
        )}
      </Draggable>
    </div>
  )
}

export default Card;
