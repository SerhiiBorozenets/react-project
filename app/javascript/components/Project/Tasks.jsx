import React, {useState} from "react";
import TaskItem from "./TaskItem";
import tasksIcon from "../../../assets/images/tasks-solid.svg";
import {Button} from "react-bootstrap";
import ModalTaskForm from "./ModalTaskForm";

const Tasks = (props) => {
  const {name} = props.attributes
  const tasks = props.tasks
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(p => !p);

  const TITLES = ['Task title', 'Deadline', 'Status', 'Actions'];
  const titles = TITLES.map( (title, index) => {
    return <th scope="col" key={index}>{title}</th>
  })
  const taskItem = tasks.map((item, index) => {
    return (
      <TaskItem key={index} attributes={item.attributes} />
    )
  })

  return(
    <>
      <section className="home-page">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-md-12 col-xl-10">
              <div className="card">
                <div className="card-header p-3">
                  <h5 className="mb-0"><i className="me-2 text-dark"><img src={tasksIcon} alt={"icon"}/></i>Project name: {name}</h5>
                </div>
                <div className="card-body table-scroll">
                  <table className="table mb-0">
                    <thead>
                      <tr>
                        {titles}
                      </tr>
                    </thead>
                    <tbody>
                      {taskItem}
                    </tbody>
                  </table>
                </div>
                <div className="card-footer text-end p-3">
                  <Button variant="primary" onClick={handleShow}>
                    Add Task
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <ModalTaskForm
        handleChange={props.handleChange}
        handleSubmit={props.handleSubmit}
        attributes={props.project.data.attributes}
        task={props.task}
        show={show}
        handleShow={handleShow}
      />
    </>
  )
}

export default Tasks