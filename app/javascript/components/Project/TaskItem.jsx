import React, {useState} from "react";
import {PencilSquare, Trash} from 'react-bootstrap-icons';
import moment from "moment/moment";
import {Link} from "react-router-dom";
import {sweetAlertRemoveTask} from "../SweetAlert/alertHelpers";
import ModalEditTaskForm from "../Modals/ModalEditTaskForm";
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { BsReception0, BsReception1, BsReception2, BsReception3, BsReception4 } from "react-icons/bs";
import {removeTask, updateTask} from "../helpers/helpers";

const TaskItem = ({ task, project, setProject }) => {
  const badgeStatusMap = {
    No: 'dark',
    Low: 'success',
    Middle: 'warning',
    High: 'danger'
  }
  const [editTask, setEditTask] = useState(task.attributes)
  const {title, due_date, status, complexity} = task.attributes
  const dueDateFormat = due_date ? moment(due_date).format('DD.MM.YYYY') : ''
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(p => !p);

  const handleClick = (e) => {
    setEditTask(Object.assign(editTask, {completed: e.target.checked}));
    return updateTask(editTask, project, setProject);
  };
  const removeTaskConfirm = () => {
    sweetAlertRemoveTask({task, project, setProject}, removeTask)
  }
  const onChangeEditTask = (e) => {
    setEditTask(Object.assign({}, editTask, {[e.target.name]: e.target.value}))
  }
  const bsReception = () => {
    switch (complexity) {
      case "None": return <BsReception0 size={25} />
      case "Elementary": return <BsReception1 size={25} />
      case "Intermediate": return <BsReception2 size={25} />
      case "Advanced": return <BsReception3 size={25} />
      case "Master": return <BsReception4 size={25} />
    }
  }

  const RenderTaskBody = () => {
    return <div className="row">
      <div className="col-sm-1 align-self-center">
        <Tippy content={` ${editTask.completed ? 'Mark as uncompleted' : 'Mark as completed'}`}>
          <input className="form-check-input checkbox-inline" type="checkbox" data-toggle='tooltip'
                 data-placement='right' data-original-title="tooltip here"
                 onChange={e => handleClick(e)} checked={editTask.completed}
                 id={`default-${editTask.id}`} />
        </Tippy>
      </div>
      <div className="col-sm-9 text-start">
        <label className={`form-check-label ${editTask.completed ? 'completed-task completed-task text-muted' : ''}`}>
          {title}
        </label>
      </div>
      <div className={`col-sm-2 text-center align-self-center ${editTask.completed ? 'text-secondary' : 'text-info'}`} title={`Complexity: ${complexity }`}>
        {bsReception()}
      </div>
    </div>
  };

  return(
    <tr className={`fw-normal ${editTask.completed ?  'completed-task text-muted' : ''}`}>
      <td className="align-middle">
        <RenderTaskBody />
      </td>
      <td className="align-middle" style={{minWidth: 100}}>
        <span>{dueDateFormat}</span>
      </td>
      <td className="align-middle">
        <h6 className="mb-0"><span className={`badge bg-${editTask.completed ? 'secondary' : badgeStatusMap[status]}`}>{status} priority</span></h6>
      </td>
      <td className="align-middle mx-2">
        <Link to="#" onClick={removeTaskConfirm} >
          <Trash className="mx-2" color={`${editTask.completed ? 'grey' : 'red'}`} size={20} />
        </Link>
        <Link to="#" onClick={handleShow} >
          <PencilSquare className="ml-2" color={`${editTask.completed ? 'grey' : 'royalblue'}`} size={20} />
        </Link>
      </td>
      <ModalEditTaskForm
        onChangeEditTask={onChangeEditTask}
        project={project}
        setProject={setProject}
        editTask={editTask}
        show={show}
        handleShow={handleShow}
      />
    </tr>
  )
}

export default TaskItem