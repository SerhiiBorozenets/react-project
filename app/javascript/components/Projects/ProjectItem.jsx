import React from "react";
import {Link} from "react-router-dom";
import {PencilSquare, Trash} from "react-bootstrap-icons";
import moment from "moment";

const ProjectItem = (props) => {
  const deadline = props.attributes.deadline
  const deadlineFormat = deadline ? moment(deadline).format('DD.MM.YYYY') : ""

  return(
    <tr className="fw-normal">
      <td className="align-middle">
        <Link to={`/projects/${props.attributes.slug}`}>
          <span> {props.attributes.name}</span>
        </Link>
      </td>
      <td className="align-middle">
        <span style={{paddingLeft: "40px"}}> {props.attributes.tasks_count}</span>
      </td>
      <td className="align-middle">
        <span>{deadlineFormat}</span>
      </td>
      <td className="align-middle mx-2">
        <Trash className="mx-2" color="red" size={20} />
        <Link to={`/projects/${props.attributes.slug}`}>
          <PencilSquare className="ml-2" color="royalblue" size={20} />
        </Link>
      </td>
    </tr>
  )
}

export default ProjectItem