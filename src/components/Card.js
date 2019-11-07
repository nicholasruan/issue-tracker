import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

function Card(props) {
  const { name, index } = props;
  
  return (
    <div>
      <Draggable draggableId={index.toString()} index={index.toString()}>
        {(provided) => (
          <div
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            {name}
          </div>
        )}
      </Draggable>
    </div>
  )
}

export default Card;
