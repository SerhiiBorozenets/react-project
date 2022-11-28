import React, {useEffect, useState} from "react";
import axios from "axios";
import tasksIcon from "../../../assets/images/tasks-solid.svg";
import ProjectItem from "./ProjectItem";
import {Button} from "react-bootstrap";
import ModalProjectForm from "../Modals/ModalProjectForm";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faPlus} from '@fortawesome/free-solid-svg-icons'
import {createCsrfToken} from "../helpers/helpers";

const Projects = () => {
  const [projects, setProjects] = useState([])
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(p => !p);
  const [project, setProject] = useState({})

  const onChangeProject = (e) => {
    setProject(Object.assign({}, project, {[e.target.name]: e.target.value}))
  }

  useEffect(()=> {
    axios.get('/api/v1/projects.json')
    .then( resp => setProjects(resp.data.data))
    .catch(resp => console.log(resp))
  }, [projects.length])

  const createProject = async () => {
    createCsrfToken()
    await axios.post('/api/v1/projects', project)
      .then(resp => {
        setProjects(projects => [...projects, resp.data.data]);
      })
      .catch(resp => {console.log(resp)})
  }

  const removeProject = async (slug) => {
    createCsrfToken()
    await axios.delete(`/api/v1/projects/${slug}`)
      .then( () => {
        const newProjects = projects.filter(item => item.attributes.slug !== String(slug))
        setProjects( [...newProjects]);
      })
      .catch(resp => {console.log(resp)})
  }

  const updateProject = async (project) => {
    createCsrfToken()
    await axios.patch(`/api/v1/projects/${project.slug}`, {project})
      .then( resp => {
        const newProjects = projects.filter(item => item.attributes.slug !== String(project.slug))
        setProjects([...newProjects, resp.data.data]);
      })
      .catch(resp => {console.log(resp)})
  }

  const TITLES = ['Project name', 'Progress', 'Due date', 'Actions'];
  const titles = TITLES.map( (title, index) => {
    return <th scope="col" key={index}>{title}</th>
  })

  const projectItem = projects.map((project) => {
    return (
      <ProjectItem key={project.id}
                   project={project}
                   removeProject={removeProject}
                   updateProject={updateProject}
      />
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
              <div className="card-footer text-end p-3">
                <Button variant="primary" onClick={handleShow} >
                  <FontAwesomeIcon icon={faPlus} />
                  Add Project
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <ModalProjectForm
      project={project}
      show={show}
      handleShow={handleShow}
      onChangeProject={onChangeProject}
      createProject={createProject}
    />
  </>
}

export default Projects