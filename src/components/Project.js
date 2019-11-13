import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import ProjectForm from './ProjectForm';
import Modal from './Modal';
import List from './List';
import AddMemberForm from './AddMemberForm';
import useModal from '../hooks/useModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import AddListForm from './AddListForm';
import { DragDropContext } from 'react-beautiful-dnd';

function Project(props) {
  const [id, setId] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [title, setTitle] = useState('');
  const [members, setMembers] = useState([]);
  const {isShowing, toggle} = useModal();
  const [showAddMembers, setShowAddMembers] = useState(false);
  const [newList, setNewList] = useState(false);
  const [lists, setLists] = useState([]);
  const [listAction, setListAction] = useState(false);

  useEffect(() => {
    const path = window.location.pathname.split('/');
    setId(path[3]);

    if (!id) return console.log('No Project Yet');

    axios.get(`https://issue-base-db.herokuapp.com/api/projects/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.token
      }
    }).then(res => {
      setTitle(res.data.project.title);
      setMembers(res.data.members);
      setLists(res.data.lists);
      setIsLoading(false);
      setListAction(false);
    }).catch(err => {
      console.log(err);
    })

  }, [id, showAddMembers, newList, listAction]);

  const deleteProject = () => {
    axios.delete(`https://issue-base-db.herokuapp.com/api/projects/${id}/delete`, { data: {
      project_id: id,
    },
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.token
      }}
    )
    .then(function (response) {
      console.log(response);
      Swal.fire({
        position: 'top-end',
        title: 'Project Deleted',
        showConfirmButton: false,
        customClass: 'success',
        timer: 3000,
        width: 500
      });
      props.history.push('/app')
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

  const toggleAddMembers = () => {
    setShowAddMembers(!showAddMembers);
  }

  const addList = () => {
    setNewList(true);
    document.querySelector('.project-body').scrollLeft += 1000000;
  }

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const startColumn = lists.filter(list => list._id === source.droppableId)[0];
    const finishColumn = lists.filter(list => list._id === destination.droppableId)[0];

    // reordering within one column
    if (startColumn._id === finishColumn._id) {
      const newCardIds = startColumn.card_ids;
      newCardIds.splice(source.index, 1);
      newCardIds.splice(destination.index, 0, draggableId);

      const updatedColumn = {
        ...startColumn,
        card_ids: newCardIds,
      };

      const updatedList = lists.map((item) => {
        if (item._id === startColumn._id) {
          return updatedColumn;
        } else {
          return item;
        }
      })

      axios.put(`https://issue-base-db.herokuapp.com/api/lists/${startColumn._id}/edit`, {
        card_ids: newCardIds
      },{
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.token
      }
      })
      .then(function (response) {
        console.log(response);
        setListAction(true);
        setLists([]);
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
      });
      return;
    }

    const startCardIds = [...startColumn.card_ids];
    startCardIds.splice(source.index, 1);
    const newStart = {
      ...startColumn,
      card_ids: startCardIds
    };

    const finishCardIds = [...finishColumn.card_ids];
    finishCardIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finishColumn,
      card_ids: finishCardIds
    };

    const updatedListWithStart = lists.map(item => {
      if (item._id === startColumn._id) {
        return newStart;
      } else {
        return item;
      }
    });

    const updatedListWithFinishAndStart = updatedListWithStart.map(item => {
      if (item._id === finishColumn._id) {
        return newFinish;
      } else {
        return item;
      }
    });

    axios.put(`https://issue-base-db.herokuapp.com/api/lists/${startColumn._id}/edit`, {
      card_ids: startCardIds
    },{
    headers: {
      'Content-Type': 'application/json',
      'auth-token': localStorage.token
    }
    })
    .then(function (response) {
      console.log(response);
      setListAction(true);
      setLists([]);
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
    });

    axios.put(`https://issue-base-db.herokuapp.com/api/lists/${finishColumn._id}/edit`, {
      card_ids: finishCardIds
    },{
    headers: {
      'Content-Type': 'application/json',
      'auth-token': localStorage.token
    }
    })
    .then(function (response) {
      console.log(response);
      setListAction(true);
      setLists([]);
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
    });
  }

  return (
    <div>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="project-container">
          {isLoading ? (<h3>Loading...</h3>) : (
            <div>
              <div className="project-header">
                <div id="project-section">
                  <h2 className="project-title">{title}</h2>
                </div>
                <div id="project-section2">
                  <div className="project-icons">
                    <FontAwesomeIcon icon={faTrashAlt} className="project-actions" onClick={deleteProject} />
                    <FontAwesomeIcon icon={faEdit} className="project-actions" onClick={toggle} />
                  </div>
                  <button className="add-list-button" onClick={addList}>+ add new list</button>
                  <div className="member-container">
                    {members.map((members, key) => (
                      <div key={key} className="member-circle">
                        <p>{members.first_name.substring(0,1)
                        }{members.last_name.substring(0,1)}</p>
                      </div>
                    ))}
                    <div className="add-member-container">
                      <div className={`member-circle add-circle`}  onClick={toggleAddMembers}>
                        <p className={showAddMembers ? 'close-add-members-form' : 'open-add-members-form'}>+</p>
                      </div>
                      <AddMemberForm
                        showAddMembers={showAddMembers}
                        toggleAddMembers={toggleAddMembers}
                        projectId={id}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <Modal
            isShowing={isShowing}
            hide={toggle}
            title={"Edit Project"}
          >
            <ProjectForm hide={toggle} routerProps={props} title={title} editMode={true} projectId={id} setTitle={setTitle} />
          </Modal>
        </div>
        <div className="project-body">
          {lists.map((list, key) =>(
            <List
              key={list._id}
              index={key}
              title={list.title}
              id={list._id}
              lists={lists}
              projectId={id}
              toggleListAction={setListAction}
              projListSize={lists.length}
            />
          ))}

          {newList ?
            <AddListForm
              showList={setNewList}
              projId={id}
            /> :  <div className="padded-section"></div>}
        </div>
      </DragDropContext>
    </div>
  )
}

export default Project;
