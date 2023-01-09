import React, {useState, Fragment} from "react";
import tasksIcon from "../../../assets/images/tasks-solid.svg";
import {Button} from "react-bootstrap";
import ModalTaskForm from "../Modals/ModalTaskForm";
import TasksTableHead from "./TasksTableHead";
import TasksTableBody from "./TasksTableBody";
import SearchFilter from "./SearchFilter";

const Tasks = ({ project, onChangeTask, task, setTask, tasks }) => {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(p => !p);
  const columns = [
    { label: "Tasks", accessor: "title", sortable: true },
    { label: "Complexity", accessor: "complexity", sortable: true },
    { label: "Due date", accessor: "due_date", sortable: true },
    { label: "Status", accessor: "status", sortable: true },
    { label: "Actions", accessor: "actions", sortable: false }
  ];
  const [query, setQuery] = useState("");
  const handleFilter = (e) => {
    e.preventDefault()
    setQuery(e.target.value)
  }

  return(
    <Fragment>
      <section className="home-page">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-md-12 col-xl-10">
              <div className="card">
                <div className="card-header p-3 d-flex justify-content-between">
                  <h5 className="mb-0 d-flex align-items-center">
                    <div>
                      <i className="me-2 text-dark">
                        <a href="/"><img src={tasksIcon} alt={"icon"}/></a>
                      </i>
                      Project title: {project.data.attributes.title}
                    </div>
                  </h5>
                  <SearchFilter hidden={project.included.length < 6} query={query} handleFilter={handleFilter} searchType={"task"} />
                </div>
                <div className="card-body table-scroll">
                  <table className="table mb-0">
                    <TasksTableHead {...{ columns, project }} />
                    <TasksTableBody {...{ tasks, project, query }} />
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
        task={task}
        setTask={setTask}
        project={project}
        show={show}
        handleShow={handleShow}
      />
    </Fragment>
  )
}

export default Tasks