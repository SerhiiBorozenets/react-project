import React from "react";
import {PencilSquare, Trash} from 'react-bootstrap-icons';
import moment from "moment/moment";
import {Link} from "react-router-dom";
import {sweetAlertRemove} from "../SweetAlert/alertHelpers";

const TaskItem = ({ task, removeTask }) => {
  const badgeMap = {
    low: 'success',
    middle: 'warning',
    high: 'danger'
  }
  const {title, deadline, status} = task.attributes
  const deadlineFormat = deadline ? moment(deadline).format('DD.MM.YYYY') : ''

  const removeTaskConfirm = () => {
    sweetAlertRemove(task.attributes, removeTask)
  }

  return(
    <tr className="fw-normal">
      <td className="align-middle">
        <span> {title}</span>
      </td>
      <td className="align-middle">
        <span>{deadlineFormat}</span>
      </td>
      <td className="align-middle">
        <h6 className="mb-0"><span className={`badge bg-${badgeMap[status]}`}>{status ? status: 'No'} priority</span></h6>
      </td>
      <td className="align-middle mx-2">
        <Link to="#"  onClick={removeTaskConfirm} >
          <Trash className="mx-2" color="red" size={20} />
        </Link>
        <PencilSquare className="ml-2" color="royalblue" size={20} />
      </td>
    </tr>
  )
}

export default TaskItem