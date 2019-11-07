import React from 'react';

function CardList(props) {
  const { children } = props;

  return (
    <div>
      {children}
    </div>
  )
}

export default CardList;
