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

  const projectItem = projects.map((item, index) => {
    return (
      <ProjectItem key={index} attributes={item.attributes} />
    )
  })

  return <>
    <section className="vh-100" style={{backgroundColor: '#eee'}}>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-md-12 col-xl-10">
            <div className="card">
              <div className="card-header p-3">
                <h5 className="mb-0"><i className="me-2 text-dark"><img src={tasksIcon} alt={"icon"}/></i>Projects list</h5>
              </div>
              <div className="card-body" style={{position: 'relative', height: '400px', overflow: "scroll"}}>
                <table className="table mb-0">
                  <thead>
                  <tr>
                    <th scope="col">Project name</th>
                    <th scope="col">Tasks Count</th>
                    <th scope="col">Deadline</th>
                    <th scope="col">Actions</th>
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