import React from "react";
import {Link} from "react-router-dom";
import {PencilSquare, Trash} from "react-bootstrap-icons";

const ProjectItem = (props) => {
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
        <h6 className="mb-0"><span className="badge bg-danger">High priority</span></h6>
      </td>
      <td className="align-middle mx-2">
        <Trash className="mx-2" color="red" size={20} />
        <PencilSquare className="ml-2" color="royalblue" size={20} />
      </td>
    </tr>
  )
}

export default ProjectItem