import React, {useState} from "react";
import {PencilSquare, Trash} from 'react-bootstrap-icons';
import moment from "moment/moment";
import {Link} from "react-router-dom";
import {sweetAlertRemove} from "../SweetAlert/alertHelpers";
import ModalEditTaskForm from "../Modals/ModalEditTaskForm";

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

  const removeTaskConfirm = () => {
    sweetAlertRemove(task.attributes, removeTask)
  }

  const onChangeEditTask = (e) => {
    setEditTask(Object.assign({}, editTask, {[e.target.name]: e.target.value}))
  }

  return(
    <tr className="fw-normal">
      <td className="align-middle">
        <span> {title}</span>
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