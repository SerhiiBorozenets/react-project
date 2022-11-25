import React, {useState} from "react";
import {Link} from "react-router-dom";
import {PencilSquare, Trash} from "react-bootstrap-icons";
import moment from "moment";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const ProjectItem = ({ project, removeProject }) => {
  const deadlineFormat = project.deadline ? moment(project.deadline).format('DD.MM.YYYY') : ""

  const removeProjectConfirm = () => {
    const MySwal = withReactContent(Swal)
    MySwal.fire({
      title: `Are you sure you want to remove ${project.title}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        removeProject(project.slug)
      }
    })
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
        <Link to="#"  onClick={ () => removeProjectConfirm() } >
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