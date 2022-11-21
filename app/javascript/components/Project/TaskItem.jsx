import React from "react";
import {PencilSquare, Trash} from 'react-bootstrap-icons';

const TaskItem = (props) => {
  return(
    <tr className="fw-normal">
      <td className="align-middle">
        <span> {props.attributes.name}</span>
      </td>
      <td className="align-middle">
        <span> {props.attributes.deadline}</span>
      </td>
      <td className="align-middle">
        <span> {props.attributes.status}</span>
        <h6 className="mb-0"><span className="badge bg-danger">High priority</span></h6>
      </td>
      <td className="align-middle mx-2">
        <Trash className="mx-2" color="red" size={20} />
        <PencilSquare className="ml-2" color="royalblue" size={20} />
      </td>
    </tr>
  )
}

export default TaskItem