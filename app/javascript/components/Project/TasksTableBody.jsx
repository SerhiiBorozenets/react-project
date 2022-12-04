import React from "react";
import TaskItem from "./TaskItem";
import {sortTask} from "../helpers/helpers";

const TasksTableBody = ({ tasks, removeTask, updateTask }) => {
  const taskItem = sortTask(tasks).map((task) => {
    return (
      <TaskItem key={task.attributes.id} task={task} removeTask={removeTask} updateTask={updateTask} />
    )
  })
  return <tbody>
    {taskItem}
  </tbody>
}

export default TasksTableBody