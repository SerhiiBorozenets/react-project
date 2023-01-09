import React, {useState} from "react";
import { useParams } from 'react-router-dom';
import Tasks from "./Tasks";
import { Fragment } from 'react';
import {useGetProjectTasksQuery} from "../../api/apiTasks";
import Spinner from "../common/Spinner";

const Project = () => {
  const params = useParams();
  const [task, setTask] = useState({})
  const {
    data: project,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetProjectTasksQuery(params);

  const onChangeTask = (e) => {
    setTask(Object.assign({}, task, {[e.target.name]: e.target.value}))
  }

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <div>{error.status}</div>;
  }

  return(isSuccess &&
    <Fragment>
      <Fragment>
        <Tasks project={project}
               tasks={project.included}
               task={task}
               setTask={setTask}
               onChangeTask={onChangeTask}
        />
      </Fragment>
    </Fragment>
  )
}

export default Project