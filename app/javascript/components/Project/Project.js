import React from "react";

const Project = (props) => {
  return(
    <div className="card">
      <div className="project-id">
        {props.attributes.user_id}
      </div>
      <div className="project-name">
        {props.attributes.name}
      </div>
    </div>
  )
}

export default Project