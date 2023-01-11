import React, {useEffect, useState} from "react";
import { useParams } from 'react-router-dom';
import Tasks from "./Tasks";
import { Fragment } from 'react';
import {useGetProjectTasksQuery} from "../../api/apiTasks";
import Spinner from "../common/Spinner";

const Project = () => {
  const params = useParams();
  const [task, setTask] = useState({})
  const {
    data,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetProjectTasksQuery(params);

  const [project, setProject] = useState({});
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    if (isSuccess) {
      setProject({...data})
      setLoaded(true)
    }
  }, [isSuccess, data])

  const onChangeTask = (e) => {
    setTask(Object.assign({}, task, {[e.target.name]: e.target.value}))
  }

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <div>{error.status}</div>;
  }

  return( loaded &&
    <Fragment>
      <Tasks project={project}
             setProject={setProject}
             tasks={project.included}
             task={task}
             setTask={setTask}
             onChangeTask={onChangeTask}
      />
    </Fragment>
  )
}

export default Project