import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

function Card(props) {
  const { name, index } = props;

  return (
    <div>
      <Draggable droppableId={index} index={index}>
        {(provided) => (
          <div
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            innerRef={provided.innerRef}
          >
            {name}
          </div>
        )}
      </Draggable>
    </div>
  )
}

export default Card;
