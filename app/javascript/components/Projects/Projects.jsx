import React, {useEffect, useState} from "react";
import axios from "axios";
import tasksIcon from "../../../assets/images/tasks-solid.svg";
import ProjectItem from "./ProjectItem";

const Projects = () => {
  const [projects, setProjects] = useState([])

  useEffect(()=> {
    axios.get('/api/v1/projects.json')
    .then( resp => setProjects(resp.data.data))
    .catch(resp => console.log(resp))
  }, [projects.length])

  const TITLES = ['Project name', 'Tasks Count', 'Deadline', 'Actions'];
  const titles = TITLES.map( (title, index) => {
    return <th scope="col" key={index}>{title}</th>
  })

  const projectItem = projects.map((item, index) => {
    return (
      <ProjectItem key={index} attributes={item.attributes} />
    )
  })

  return <>
    <section className="home-page">
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-md-12 col-xl-10">
            <div className="card">
              <div className="card-header p-3">
                <h5 className="mb-0"><i className="me-2 text-dark"><img src={tasksIcon} alt={"icon"}/></i>Projects list</h5>
              </div>
              <div className="card-body table-scroll">
                <table className="table mb-0">
                  <thead>
                  <tr>
                    {titles}
                  </tr>
                  </thead>
                  <tbody>
                    {projectItem}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </>
}

export default Projects