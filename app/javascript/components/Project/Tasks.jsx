import React from "react";
import TaskItem from "./TaskItem";
import tasksIcon from "../../../assets/images/tasks-solid.svg";

const Tasks = (props) => {
  const {name} = props.attributes
  const tasks = props.tasks

  const taskItem = tasks.map((item, index) => {
    return (
      <TaskItem key={index} attributes={item.attributes} />
    )
  })

  return(
    <section className="vh-100" style={{backgroundColor: '#eee'}}>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-md-12 col-xl-10">
            <div className="card">
              <div className="card-header p-3">
                <h5 className="mb-0"><i className="me-2 text-dark"><img src={tasksIcon} alt={"icon"}/></i>Project name: {name}</h5>
              </div>
              <div className="card-body" data-mdb-perfect-scrollbar="true" style={{position: 'relative', height: '400px'}}>
                <table className="table mb-0">
                  <thead>
                  <tr>
                    <th scope="col">Task title</th>
                    <th scope="col">Deadline</th>
                    <th scope="col">Status</th>
                    <th scope="col">Actions</th>
                  </tr>
                  </thead>
                  <tbody>
                  {taskItem}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Tasks