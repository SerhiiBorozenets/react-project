import React from "react";
import TaskItem from "./TaskItem";
import {sortTask} from "../helpers/helpers";

const TasksTableBody = ({ tasks, project, setProject }) => {
  const taskItem = sortTask(tasks).map((task) => {
    return (
      <TaskItem key={task.attributes.id} task={task} project={project} setProject={setProject} />
    )
  })
  return <tbody>
    {taskItem}
  </tbody>
}

export default TasksTableBody