import React, { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import CardMenu from './CardMenu';

function Card(props) {
  const [showCardMenu, setShowCardMenu] = useState(false);
  const { name, index, id } = props;

  const Container = styled.div`
    border: 1px solid lightgrey;
    border-radius: 2px;
    padding: 8px;
    margin-bottom: 8px;
    background: white;
    box-shadow: 1px 1px 5px 1px #c2c2c2;
  `;

  const toggleCardMenu = () => {
    setShowCardMenu(!showCardMenu);
  }

  return (
      <Draggable draggableId={id} index={index}>
        {(provided) => (
          <Container
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            <div className="card-header">
              <p>{name}</p>
              <div className="card-settings" onClick={toggleCardMenu}>...</div>
            </div>
            <div className="card-menu">
              {showCardMenu ? <CardMenu /> : null}
            </div>
            <div className="card-body">

            </div>
          </Container>
        )}
      </Draggable>
  )
}

export default Card;
