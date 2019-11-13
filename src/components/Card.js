import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';


function Card(props) {
  const { name, index, id } = props;

  const Container = styled.div`
    border: 1px solid lightgrey;
    border-radius: 2px;
    padding: 8px;
    margin-bottom: 8px;
    background: white;
  `;

  return (
      <Draggable draggableId={id} index={index}>
        {(provided) => (
          <Container
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            {name}
          </Container>
        )}
      </Draggable>
  )
}

export default Card;
