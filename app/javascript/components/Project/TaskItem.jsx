import React from "react";
import {PencilSquare, Trash} from 'react-bootstrap-icons';
import moment from "moment/moment";

const TaskItem = (props) => {
  const badgeMap = {
    low: 'success',
    middle: 'warning',
    high: 'danger'
  }
  const status = props.attributes?.status
  const deadline = props.attributes?.deadline
  const deadlineFormat = deadline ? moment(deadline).format('DD.MM.YYYY') : ""

  return(
    <tr className="fw-normal">
      <td className="align-middle">
        <span> {props.attributes?.name}</span>
      </td>
      <td className="align-middle">
        <span>{deadlineFormat}</span>
      </td>
      <td className="align-middle">
        <h6 className="mb-0"><span className={`badge bg-${badgeMap[status]}`}>{status ? status: 'No'} priority</span></h6>
      </td>
      <td className="align-middle mx-2">
        <Trash className="mx-2" color="red" size={20} />
        <PencilSquare className="ml-2" color="royalblue" size={20} />
      </td>
    </tr>
  )
}

export default TaskItem