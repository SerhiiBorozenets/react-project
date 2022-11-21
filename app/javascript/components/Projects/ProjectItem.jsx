import React from "react";
import {Link} from "react-router-dom";

const ProjectItem = (props) => {
  return(
    <tr className="fw-normal">
      <td className="align-middle">
        <Link to={`/projects/${props.attributes.slug}`}>
          <span> {props.attributes.name}</span>
        </Link>
      </td>
      <td className="align-middle">

      </td>
      <td className="align-middle">
        <h6 className="mb-0"><span className="badge bg-danger">High priority</span></h6>
      </td>
      <td className="align-middle">

      </td>
    </tr>
  )
}

export default ProjectItem