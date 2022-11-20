import React, {useEffect, useState} from "react";
import axios from "axios";
import Project from "../Project/Project";

const Projects = () => {
  const [projects, setProjects] = useState([])

  useEffect(()=> {
    axios.get('/api/v1/projects.json')
    .then( resp =>{setProjects(resp.data.data)})
    .catch(resp => console.log(resp))
  }, [projects.length])

  const grid = projects.map( item => {
    return (
      <Project key={item.attributes.name} attributes={item.attributes} />
    )
  })

  return (
    <div className="home">
      <div className="header">
        <h1>Project list</h1>
        <div className="subheader">Projects task here too.</div>
      </div>
      <div className="grid">
        <ul>{grid}</ul>
      </div>
    </div>
  )
}

export default Projects