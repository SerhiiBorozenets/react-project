import React, {useState} from "react";
import {PencilSquare, Trash} from 'react-bootstrap-icons';
import moment from "moment/moment";
import {Link} from "react-router-dom";
import {sweetAlertRemove} from "../SweetAlert/alertHelpers";
import ModalEditTaskForm from "../Modals/ModalEditTaskForm";
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css'; // optional

const TaskItem = ({ task, removeTask, updateTask }) => {
  const badgeMap = {
    Low: 'success',
    Middle: 'warning',
    High: 'danger'
  }
  const [editTask, setEditTask] = useState(task.attributes)
  const {title, due_date, status} = task.attributes
  const dueDateFormat = due_date ? moment(due_date).format('DD.MM.YYYY') : ''
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(p => !p);

  const handleClick = (e) => {
    Object.assign(editTask, {completed: e.target.checked});
    updateTask(editTask);
  };

  const removeTaskConfirm = () => {
    sweetAlertRemove(task.attributes, removeTask)
  }

  const onChangeEditTask = (e) => {
    setEditTask(Object.assign({}, editTask, {[e.target.name]: e.target.value}))
  }

  const RenderCheckbox = () => (
    <div className={`form-check`}>
      <Tippy content={` ${editTask.completed ?  'Mark as uncompleted' : 'Mark as completed'}`}>
        <input className="form-check-input checkbox-inline" type="checkbox" data-toggle='tooltip' data-placement='right' data-original-title="tooltip here"
               onChange={e => handleClick(e)} checked={editTask.completed}
               id={`default-${editTask.id}`} />
      </Tippy>
      <label className={`form-check-label ${editTask.completed ?  'completed-task' : ''}`}>
        {title}
      </label>
    </div>
  );

  return(
    <tr className={`fw-normal ${editTask.completed ?  'completed-task' : ''}`}>
      <td className="align-middle">
        <RenderCheckbox />
      </td>
      <td className="align-middle">
        <span>{dueDateFormat}</span>
      </td>
      <td className="align-middle">
        <h6 className="mb-0"><span className={`badge bg-${badgeMap[status]}`}>{status ? status: 'No'} priority</span></h6>
      </td>
      <td className="align-middle mx-2">
        <Link to="#"  onClick={removeTaskConfirm} >
          <Trash className="mx-2" color="red" size={20} />
        </Link>
        <Link to="#"  onClick={handleShow} >
          <PencilSquare className="ml-2" color="royalblue" size={20} />
        </Link>
      </td>
      <ModalEditTaskForm
        onChangeEditTask={onChangeEditTask}
        updateTask={updateTask}
        editTask={editTask}
        show={show}
        handleShow={handleShow}
      />
    </tr>
  )
}

export default TaskItem