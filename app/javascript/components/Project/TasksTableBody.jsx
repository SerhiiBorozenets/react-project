import React, {useEffect, useState} from "react";
import TaskItem from "./TaskItem";
import {searchFunc, sortTask} from "../helpers/helpers";

const TasksTableBody = ({ tasks, project, setProject, query }) => {
  const [sortedTasks, setSortedTasks] = useState([])

  useEffect(() => {
    setSortedTasks(sortTask(tasks))
  }, [tasks])

  const taskItem = searchFunc(sortedTasks, query).map((task) => {
    return (
      <TaskItem key={task.attributes.id} task={task} project={project} setProject={setProject} />
    )
  })

  return <tbody>
    {taskItem}
  </tbody>
}

export default TasksTableBody