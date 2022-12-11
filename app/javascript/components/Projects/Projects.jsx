import React, {useEffect, useState, Fragment} from "react";
import axios from "axios";
import tasksIcon from "../../../assets/images/tasks-solid.svg";
import ProjectItem from "./ProjectItem";
import {Button} from "react-bootstrap";
import ModalProjectForm from "../Modals/ModalProjectForm";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faPlus} from '@fortawesome/free-solid-svg-icons'
import {exportProject, searchFunc} from "../helpers/helpers";
import SearchFilter from "../Project/SearchFilter";
import { ImFileExcel } from "react-icons/im";
import {Link} from "react-router-dom";

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

  const TITLES = ['Project name', 'Progress', 'Due date', 'Actions'];
  const titles = TITLES.map( (title, index) => {
    return <th scope="col" key={index}>{title}</th>
  })
  const [query, setQuery] = useState("");
  const handleFilter = (e) => {
    e.preventDefault()
    setQuery(e.target.value)
  }

  const projectItem = searchFunc(projects, query).map((project) => {
    return (
      <ProjectItem key={project.id}
                   project={project}
                   setProjects={setProjects}
                   projects={projects}
      />
    )
  })

  const ExportProjects = () =>
    <a href="/api/v1/projects.zip" download>
      <button  onClick={exportProject} type="button" className="btn btn-outline-success d-inline-flex align-items-center">
        <div style={{marginRight: 10}}>Export</div>
        <ImFileExcel />
      </button>
    </a>


  return <Fragment>
    <section className="home-page">
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-md-12 col-xl-10">
            <div className="card">
              <div className="card-header p-3 d-flex justify-content-between">
                <h5 className="mb-0 d-flex align-items-center"><i className="me-2 text-dark"><img src={tasksIcon} alt={"icon"}/></i>Projects list</h5>
                <div className='d-inline-flex align-items-center'>
                  <SearchFilter query={query} handleFilter={handleFilter} searchType={"project"} hidden={projects.length < 6} />
                  <ExportProjects />
                </div>
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
      projects={projects}
      setProjects={setProjects}
    />
  </Fragment>
}

export default Projects