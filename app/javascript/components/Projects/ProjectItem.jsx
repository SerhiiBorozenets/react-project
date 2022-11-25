import React, {useState} from "react";
import {Link} from "react-router-dom";
import {PencilSquare, Trash} from "react-bootstrap-icons";
import moment from "moment";
import {sweetAlertRemove} from "../SweetAlert/alertHelpers";

const ProjectItem = ({ project, removeProject }) => {
  const deadlineFormat = project.deadline ? moment(project.deadline).format('DD.MM.YYYY') : ""

  const removeProjectConfirm = () => {
    sweetAlertRemove(project, removeProject)
  }

  return(
    <tr className="fw-normal">
      <td className="align-middle">
        <Link to={`/projects/${project.slug}`}>
          <span> {project.title}</span>
        </Link>
      </td>
      <td className="align-middle">
        <span style={{paddingLeft: "40px"}}> {project.tasks_count}</span>
      </td>
      <td className="align-middle">
        <span>{deadlineFormat}</span>
      </td>
      <td className="align-middle mx-2">
        <Link to="#"  onClick={removeProjectConfirm} >
          <Trash className="mx-2" color="red" size={20} />
        </Link>
        <Link to={`/projects/${project.slug}`}>
          <PencilSquare className="ml-2" color="royalblue" size={20} />
        </Link>
      </td>
    </tr>
  )
}

export default ProjectItem