import React, {useEffect, useState} from "react";
import TaskItem from "./TaskItem";
import tasksIcon from "../../../assets/images/tasks-solid.svg";
import {Button} from "react-bootstrap";
import ModalTaskForm from "../Modals/ModalTaskForm";
import {sortTask} from "../helpers/helpers";

const Tasks = ({ project, onChangeTask, createTask, tasks, task, removeTask, updateTask }) => {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(p => !p);
  const TITLES = ['Task title', 'Due date', 'Status', 'Actions'];
  const titles = TITLES.map( (title, index) => {
    return <th scope="col" key={index}>{title}</th>
  })
  const taskItem = sortTask(tasks).map((task) => {
    return (
      <TaskItem key={task.attributes.id} task={task} removeTask={removeTask} updateTask={updateTask} />
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
                  <h5 className="mb-0">
                    <i className="me-2 text-dark">
                      <a href="/"><img src={tasksIcon} alt={"icon"}/></a>
                    </i>
                    Project title: {project.data.attributes.title}
                  </h5>
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
        onChangeTask={onChangeTask}
        createTask={createTask}
        task={task}
        show={show}
        handleShow={handleShow}
      />
    </>
  )
}

export default Tasks