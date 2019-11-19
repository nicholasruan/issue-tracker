import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import ListMenu from './ListMenu';
import EditListForm from './EditListForm';
import Card from './Card';
import AddCardForm from './AddCardForm';
import { Droppable } from 'react-beautiful-dnd';

function List(props) {
  const [showListMenu, setShowListMenu] = useState(false);
  const [showListEdit, setShowListEdit] = useState(false);
  const [cardList, setCardList] = useState([]);
  const [showCardForm, setShowCardForm] = useState(false);
  const { toggleListAction, title, id, index, projListSize, lists, projectId } = props;

  useEffect(() => {
    if (showListMenu) {
      document.body.addEventListener('click', (e) => {
        const listMenuItem = 'list-menu-item';
        const listSettings = 'list-settings';
        const listMenuContainer = 'list-menu-container';

        if (listMenuItem !== e.target.className && listSettings !== e.target.className && listMenuContainer !== e.target.className) {
          setShowListMenu(false);
        }
      });
    }

    axios.get(`https://issue-base-db.herokuapp.com/api/lists/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.token
      }
    }).then(res => {
      setCardList(res.data.cards);
    }).catch(err => {
      console.log(err);
    })
  }, [id, showListMenu]);

  // useEffect(() => {
  //   console.log('diu lei');
  //   axios.get(`https://issue-base-db.herokuapp.com/api/lists/${id}`, {
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'auth-token': localStorage.token
  //     }
  //   }).then(res => {
  //     setCardList(res.data.cards);
  //   }).catch(err => {
  //     console.log(err);
  //   })
  // }, [id])

  const toggleListMenu = (e) => {
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

  const moveList = (direction, idx) => {
    let projLists = [];

    for (let i = 0; i < lists.length; i++) {
      projLists.push(lists[i]._id);
    }

    if (direction === "left") {
      let tempIdx = projLists[idx - 1];;
      projLists[idx - 1] = projLists[idx];
      projLists[idx] = tempIdx;
    } else if (direction === 'right') {
      let tempIdx = projLists[idx + 1];;
      projLists[idx + 1] = projLists[idx];
      projLists[idx] = tempIdx;
    }

    axios.put(`https://issue-base-db.herokuapp.com/api/projects/${projectId}/edit`, {
     list_ids: projLists
    },{
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.token
      }
    })
    .then(function (response) {
      console.log(response);
      toggleListMenu();
      toggleListAction(true);
    })
    .catch(function (error) {
      const message = error.response || '';
      Swal.fire({
        position: 'top-end',
        title: message.data,
        showConfirmButton: false,
        timer: 3000,
        width: 500
      });
    })
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
        <Droppable droppableId={id}>
          {provided => (
            <div ref={provided.innerRef} {...provided.droppableProps} className="droppable-area">
              {cardList.map((card, index) => <Card key={card._id} index={index} name={card.name} id={card._id}/>)}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
      <div className="list-footer">
        {showCardForm ? <AddCardForm setShowCardForm={setShowCardForm} /> : null}
        <div className="add-card-button">
          <button
            className="add-list-button add-card"
            onClick={() => setShowCardForm(true)}
          >
            Add a new card
          </button>
        </div>
      </div>
    </div>
  )
}

export default List;
